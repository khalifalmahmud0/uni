import moment from 'moment/moment';
async function error_trace(
    models: any,
    error: any,
    url: any,
    params: any,
): Promise<string> {
    function generateUID() {
        const timestamp = new Date().getTime();
        const randomPart = Math.floor(Math.random() * 10000);
        return `${timestamp}00${randomPart}`;
    }
    let uid: string = generateUID();

    try {
        let time = moment().format('YYYY-MM-DD HH:mm:ss');
        await models.sequelize.query(
            `INSERT INTO error_traces (title, details, uid, url, params, created_at, updated_at) VALUES (${JSON.stringify(error.message)}, '${JSON.stringify(error.stack)}', '${uid}', '${url}', '${JSON.stringify(params)}', '${time}', '${time}')`,
        );
    } catch (error) {
        console.error('Error executing manual query:', error);
    }

    return uid;
}

export default error_trace;
