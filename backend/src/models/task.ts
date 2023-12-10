import { Model, DataTypes, Sequelize } from 'sequelize';

export class Task extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public status!: string;
    public deadline!: string;
}


/*async function asyncSaveAndFindTest(): Promise<Task[]> {
    return await new Task({ name: 'someName' }).save().then(res => Task.findAll());
}*/
export const initTaskModel = (sequelize: Sequelize): void => {
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                //allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                //allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                //allowNull: false,
            },
            deadline: {
                type: DataTypes.DATE,
                //allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Task',
            tableName: 'Task',
        }
    );
};

export default Task;