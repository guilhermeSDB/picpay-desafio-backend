import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'transactions' })
export class Transaction {
	@PrimaryGeneratedColumn({ type: 'integer' })
	id: number;

	@Column({ type: 'int' })
	amount: number;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'sender_id' })
	sender: User;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'receiver_id' })
	receiver: User;

	@Column({ type: 'datetime' })
	timestamp: Date;
}
