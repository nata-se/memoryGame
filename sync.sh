npm run build
# /usr/local/bin/aws2 s3 sync ./build s3://memory.game --delete --acl public-read
/usr/local/bin/aws2 s3 sync ./build s3://mindover.cloud/memorygame --delete --acl public-read
