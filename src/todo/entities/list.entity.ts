import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Item, (item) => item.list)
    item: Item;
}
