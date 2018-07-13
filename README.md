aws rds create-db-instance \
    --db-instance-identifier MySQLForLambdaColdStartTest \
    --db-instance-class db.t2.micro \
    --engine MySQL \
    --allocated-storage 5 \
    --db-name cold_start_test \
    --master-username xxxxxxxxxxxxxxxxxxxx \
    --master-user-password xxxxxxxxxxxxxxxxxxxx \
    --backup-retention-period 3 \
    --profile xxxxxxxxxxxxxxxxxxxx

See random_names.sql

