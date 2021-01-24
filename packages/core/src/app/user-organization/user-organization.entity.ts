import {
	Entity,
	Index,
	Column,
	JoinColumn,
	RelationId,
	ManyToOne
} from 'typeorm';
import { IUserOrganization } from '@gauzy/contracts';
import { DeepPartial } from '@gauzy/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { TenantOrganizationBaseEntity, User } from '../core/entities/internal';

@Entity('user_organization')
export class UserOrganization
	extends TenantOrganizationBaseEntity
	implements IUserOrganization {
	constructor(input?: DeepPartial<UserOrganization>) {
		super(input);
	}

	@ApiProperty({ type: User })
	@ManyToOne((type) => User, { nullable: true, onDelete: 'CASCADE' })
	@JoinColumn()
	user?: User;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@Index()
	@Column()
	@RelationId((userOrganization: UserOrganization) => userOrganization.user)
	userId: string;

	@ApiProperty({ type: Boolean, default: true })
	@Index()
	@Column({ default: true })
	isDefault: boolean;

	@ApiProperty({ type: Boolean, default: true })
	@Index()
	@Column({ default: true })
	isActive: boolean;
}