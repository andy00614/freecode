const target = `create table if not exists \`\${haha}.migration_demo23\` ( 
    \`cluster_id\` string,
    \`total_task_count\` int,
    \`successful_task_count\` int,
    \`task_success_rate\` double
)
partitioned by (p_date string)
stored as parquet;

insert overwrite table \${db['ks_xs']}.migration_demo23 partition (p_date='{{ ds_nodash + 0 }}')
select cluster_id,total_task_count,successful_task_count,task_success_rate from ks_data_quality.airflow_task_run_stat where p_date='20201026';`


function testTimeVar(sql) {
    const regx = /\$\{([^\}]*)\}{1}/gi
    let cur
    while(cur = regx.exec(sql)) {
        console.log(cur[1]);
    }
}


testTimeVar(target)