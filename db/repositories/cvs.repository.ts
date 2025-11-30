import { and, eq, inArray, SQL } from 'drizzle-orm';
import { ROLE } from '~/common/const/permission';
import { roles, userRoles } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';
import { db } from '..';
import { CreateCV, CV, cv, UpdateCV } from '../schema/cv/cv.schema';
import { UserRepository, userRepository } from './users.repository';

export class CVRepository {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async cvWhere(whereClause?: SQL): Promise<SQL | undefined> {
    const clientRole = await db.query.roles.findFirst({
      where: eq(roles.name, ROLE.CLIENT),
    });

    if (!clientRole) throw new NotFoundException(`Role ${ROLE.CLIENT} not found`);

    const usersWithClientRole = await db
      .select({ userId: userRoles.userId })
      .from(userRoles)
      .where(eq(userRoles.roleId, clientRole.id));

    const userIds = usersWithClientRole.map((u) => u.userId);

    if (userIds.length === 0) return undefined;

    return and(inArray(cv.userId, userIds), whereClause);
  }

  async findMany(whereClause?: SQL): Promise<CV[]> {
    const clause = await this.cvWhere(whereClause);
    if (!clause) throw new NotFoundException('CV not found');

    return (await db.select().from(cv).where(clause)) as CV[];
  }

  async findById(id: number): Promise<CV> {
    const clause = await this.cvWhere(eq(cv.id, id));
    if (!clause) throw new NotFoundException('CV not found');

    const rows = await db.select().from(cv).where(clause).limit(1);

    if (!rows[0]) throw new NotFoundException('CV not found');

    return rows[0] as CV;
  }

  async create(payload: CreateCV): Promise<CV> {
    const clientRole = await db.query.roles.findFirst({
      where: eq(roles.name, ROLE.CLIENT),
    });

    if (!clientRole) throw new NotFoundException(`Role ${ROLE.CLIENT} not found`);

    const checkUser = await db
      .select()
      .from(userRoles)
      .where(and(eq(userRoles.userId, payload.userId), eq(userRoles.roleId, clientRole.id)))
      .limit(1);

    if (checkUser.length === 0) throw new NotFoundException('User is not authorized to create CV');

    // CREATE aman
    const [inserted] = await db.insert(cv).values(payload).returning();
    return inserted as CV;
  }

  async update(id: number, payload: UpdateCV): Promise<CV> {
    const clause = await this.cvWhere(eq(cv.id, id));
    if (!clause) throw new NotFoundException('CV not found');

    const [updated] = await db.update(cv).set(payload).where(clause).returning();

    if (!updated) throw new NotFoundException('CV not found');

    return updated as CV;
  }

  async delete(id: number): Promise<boolean> {
    const clause = await this.cvWhere(eq(cv.id, id));
    if (!clause) throw new NotFoundException('CV not found');

    const deleted = await db.delete(cv).where(clause).returning();

    return deleted.length > 0;
  }
}

export const cvRepository = new CVRepository(userRepository);
