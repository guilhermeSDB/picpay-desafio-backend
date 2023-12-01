import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
	@Column()
	amount: number;

	@Column({ name: 'sender_id' })
	senderId: number;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'sender_id' })
	sender: User;

	@Column({ name: 'receiver_id' })
	receiverId: number;

	@ManyToOne(() => User, (user) => user.id)
	@JoinColumn({ name: 'receiver_id' })
	receiver: User;
}
