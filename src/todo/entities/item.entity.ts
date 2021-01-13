import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from './list.entity';

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    done: boolean;

    @OneToMany(() => List, (list) => list.item)
    list: List;
}
