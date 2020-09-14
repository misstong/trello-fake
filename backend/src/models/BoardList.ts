import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript'
import { Board } from './Board'
import { User} from './User'

@Table({
    tableName: 'BoardList'
})
export class BoardList extends Model<BoardList> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    userId: number

    @ForeignKey(()=>Board)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    boardId: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        defaultValue: 0
    })
    order: number

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}