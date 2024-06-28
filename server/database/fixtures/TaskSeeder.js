const AbstractSeeder = require("./AbstractSeeder");

class TaskSeeder extends AbstractSeeder {
    constructor() {
        super({table: "User_has_Task", truncate: true});
    }

    async run() {
        const tasks = [];  
        for (let i = 0; i < 10; i += 1) {
            const fakeTask = {
                User_id: this.getRef(`user_${i}`).insertId,  
                Task_id: i + 1,  
                status: this.faker.helpers.arrayElement(['todo', 'process', 'finish'])
            };
            tasks.push(fakeTask);
        }
        await this.insertData(tasks);  
    }

    async insertData(data) {
        try {
            if (this.truncate) {
                await this.db.query(`TRUNCATE TABLE ${this.table}`);
            }
            
            await this.db.query(`INSERT INTO ${this.table} (User_id, Task_id, status) VALUES ?`, [data.map(task => [task.User_id, task.Task_id, task.status])]);
        } catch (error) {
            console.error('Error seeding tasks:', error);
        }
    }
}

module.exports = TaskSeeder;
