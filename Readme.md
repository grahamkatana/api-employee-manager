<h1>Running the project</h1>
npx ts-node src/index
<p>On the server you can use the build.sh file to install your dependencies</p>

### Runthe command to sstart the server and change env accordingly as given on the example
``` npm run build ```


<ul>
<li>Bootstrap the .sequalizerc</li>
</ul>

### Adding a new model
```npx sequelize-cli model:generate --name EmployeeDetail --attributes first_name:string,last_name:string,gender:ENUM,salutation:ENUM,employee_number:string,gross_salary:decimal,profile_color:string```

# Coolify Persistent Storage Setup Guide

## Overview

This guide explains how to configure persistent storage for your Employee Manager API deployed on Coolify. Persistent storage ensures that data (uploaded files, database content) survives application redeployments.

## Prerequisites

- Application deployed on Coolify using Docker Compose
- Access to Coolify dashboard
- Application must be running (initial deployment completed)

## Understanding Storage Requirements

Your application requires three persistent volumes:

1. **app_storage** - Application file storage (/app/storage)
2. **app_uploads** - User file uploads (/app/uploads)  
3. **mysql_data** - MySQL database data (/var/lib/mysql)

## Step-by-Step Configuration

### Step 1: Access Storage Configuration

1. Log into your Coolify dashboard
2. Navigate to your deployed application
3. Click on the **Storages** or **Persistent Storage** tab

### Step 2: Add Application Storage Volume

1. Click the **Add** button
2. Select **Volume** as the storage type
3. Configure the volume:
   - **Name**: `app_storage`
   - **Source**: Leave empty (Docker managed volume)
   - **Destination**: `/app/storage`
   - **Container**: Select `api` from dropdown
4. Click **Save**

### Step 3: Add Uploads Storage Volume

1. Click the **Add** button again
2. Select **Volume** as the storage type
3. Configure the volume:
   - **Name**: `app_uploads`
   - **Source**: Leave empty
   - **Destination**: `/app/uploads`
   - **Container**: Select `api` from dropdown
4. Click **Save**

### Step 4: Add MySQL Data Volume

1. Click the **Add** button again
2. Select **Volume** as the storage type
3. Configure the volume:
   - **Name**: `mysql_data`
   - **Source**: Leave empty
   - **Destination**: `/var/lib/mysql`
   - **Container**: Select `mysql` from dropdown
4. Click **Save**

### Step 5: Redeploy Application

After adding all three volumes:

1. Navigate back to your application's main page
2. Click the **Deploy** button
3. Wait for deployment to complete
4. Monitor logs for successful startup

## Verification

### Method 1: Check Deployment Logs

Look for these messages in the deployment logs:

```
Database is ready!
Database ensured
Migrations completed successfully
Starting application on port 8000...
```

### Method 2: Using Coolify Terminal

1. Go to your application in Coolify
2. Click the **Terminal** tab
3. Select the `api` container
4. Run these commands:

```bash
# Check storage directory exists
ls -la /app/storage

# Create test file
touch /app/storage/test.txt

# Verify file exists
ls -la /app/storage/test.txt
```

5. Trigger a redeployment
6. Return to terminal and verify the file still exists

### Method 3: SSH to Coolify Server

If you have SSH access to your Coolify server:

```bash
# List running containers
docker ps | grep employee

# Test storage persistence
docker exec <api-container-id> touch /app/storage/test-$(date +%s).txt
docker exec <api-container-id> ls -la /app/storage/

# Trigger redeploy in Coolify UI

# Verify files persist with new container ID
docker exec <new-api-container-id> ls -la /app/storage/
```

If files persist after redeployment, storage is configured correctly.

## Configuration Summary

| Volume Name  | Container | Destination Path  | Purpose                    |
|-------------|-----------|-------------------|----------------------------|
| app_storage | api       | /app/storage      | Application file storage   |
| app_uploads | api       | /app/uploads      | User uploaded files        |
| mysql_data  | mysql     | /var/lib/mysql    | MySQL database files       |

## Important Notes

### Source Field Must Be Empty

Always leave the **Source** field empty. This allows Docker to manage the volume automatically. Manual paths can cause permission and portability issues.

### Container Selection Matters

Ensure you select the correct container for each volume:
- Application volumes (storage, uploads) must use the `api` container
- Database volume must use the `mysql` container

### Redeployment Required

Storage volumes only take effect after a redeployment. Always redeploy after adding or modifying storage configurations.

### Volume Persistence

Once configured, volumes persist independently of your application containers. This means:
- Data survives redeployments
- Data survives container restarts
- Data survives application updates
- Data is only deleted if you explicitly remove the volume

## Troubleshooting

### Storage Not Persisting

**Problem**: Files disappear after redeployment

**Solutions**:
1. Verify Source field is empty
2. Confirm correct Destination paths
3. Check container selection is correct
4. Ensure you redeployed after adding volumes

**Verification**:
```bash
# On Coolify server
docker volume ls | grep <your-app-name>
docker volume inspect <volume-name>
```

### Permission Errors

**Problem**: Application cannot write to storage directories

**Solution**: The Dockerfile already sets correct permissions (chmod 777). If issues persist:

```bash
# Access container
docker exec -it <container-id> sh

# Check permissions
ls -ld /app/storage
ls -ld /app/uploads

# Fix if needed (should not be necessary)
chmod 777 /app/storage
chmod 777 /app/uploads
```

### Database Connection Issues

**Problem**: MySQL data not persisting

**Solution**:
1. Verify mysql_data volume is attached to `mysql` container (not `api`)
2. Confirm Destination is `/var/lib/mysql`
3. Check MySQL container logs for errors

### Volume Not Appearing in Coolify

**Problem**: Added volume doesn't show in Coolify UI

**Solution**:
1. Refresh the browser page
2. Navigate away and back to the Storages tab
3. If still missing, try adding the volume again

## Backup and Recovery

### Manual Backup

To backup your persistent volumes:

```bash
# Backup application storage
docker run --rm -v <volume-name>:/data -v $(pwd):/backup \
  alpine tar czf /backup/storage-backup.tar.gz /data

# Backup MySQL data
docker exec <mysql-container> mysqldump -u root -p<password> \
  <database-name> > backup-$(date +%Y%m%d).sql
```

### Restore from Backup

```bash
# Restore application storage
docker run --rm -v <volume-name>:/data -v $(pwd):/backup \
  alpine tar xzf /backup/storage-backup.tar.gz -C /data

# Restore MySQL data
docker exec -i <mysql-container> mysql -u root -p<password> \
  <database-name> < backup-20241127.sql
```

## Advanced Configuration

### Custom Volume Paths

If you need to use a specific host directory (not recommended):

1. Select **File Mount** instead of Volume
2. Enter host path in Source field
3. Ensure proper permissions on host directory

Note: This approach reduces portability and may cause permission issues.

### Volume Size Limits

Coolify does not enforce volume size limits by default. Monitor disk usage:

```bash
# Check volume sizes
docker system df -v

# Check specific volume
docker volume inspect <volume-name>
```

## Security Considerations

### File Permissions

The application runs with permissive file permissions (777) for simplicity. For production environments, consider:

1. Running application as non-root user
2. Setting more restrictive permissions (755 or 775)
3. Using proper user/group ownership

### Database Security

- Always use strong passwords for MySQL
- Restrict database access to application network only
- Enable SSL for database connections if exposing externally
- Regular backup of mysql_data volume

### Access Control

- Limit who can access Coolify dashboard
- Use Coolify's access control features
- Audit storage access regularly

## Maintenance

### Regular Tasks

1. **Monitor disk usage**: Check available space regularly
2. **Backup volumes**: Schedule regular backups of critical data
3. **Test restores**: Periodically verify backup integrity
4. **Clean old data**: Remove unnecessary files from storage volumes
5. **Update application**: Keep dependencies and base images updated

### Disk Space Management

```bash
# Check disk usage
df -h

# Check Docker disk usage
docker system df

# Clean up unused volumes (careful!)
docker volume prune

# Remove specific volume (destructive!)
docker volume rm <volume-name>
```

## Support

If you encounter issues not covered in this guide:

1. Check Coolify documentation: https://coolify.io/docs
2. Review application logs in Coolify dashboard
3. Inspect container logs: `docker logs <container-id>`
4. Check volume configuration: `docker volume inspect <volume-name>`

## Changelog

- 2024-11-27: Initial documentation
- Added troubleshooting section
- Added backup and recovery procedures
- Added security considerations

## Related Documentation

- [Coolify Official Docs](https://coolify.io/docs)
- [Docker Volumes Documentation](https://docs.docker.com/storage/volumes/)
- [MySQL Data Directory](https://dev.mysql.com/doc/refman/8.0/en/data-directory.html)
