import { IUser, IProject } from "../../models/api";
import { UserRole } from "../../static/core-enums";

// Mock users coming from API

const MOCK_API_USERS: Partial<IUser>[] = [
  {
    name: 'John Doe',
    email: 'johndoe@email.com',
    imgURL: '...',
  },
  {
    name: 'Martha Doe',
    email: 'marthadoe@email.com',
    imgURL: '...',
  },
  {
    name: 'Chris Doe',
    email: 'chrisdoe@email.com',
    imgURL: '...',
  },
];

// Get current used user entity used by the client.

const responseGetOwnUser: Partial<IUser> = MOCK_API_USERS[0];

// Mock projects coming from API
const MOCK_API_PROJECTS: IProject[] = [
  {
    id: '0',
    name: 'Test Project #1',
    description: 'A project with reason to be',
    owner: MOCK_API_USERS[2] as IUser,
    teamMembers: [
      { ...responseGetOwnUser, role: UserRole.Worker },
      { ...MOCK_API_USERS[1], role: UserRole.Worker },
      { ...MOCK_API_USERS[2], role: UserRole.Admin }
    ] as IUser[]
  },
  {
    id: '1',
    name: 'Test Project #2',
    description: 'A project where you are the boss',
    owner: responseGetOwnUser as IUser,
    teamMembers: [
      { ...responseGetOwnUser, role: UserRole.Admin },
      { ...MOCK_API_USERS[1], role: UserRole.Worker },
      { ...MOCK_API_USERS[2], role: UserRole.Worker }
    ] as IUser[]
  },
  {
    id: '2',
    name: 'Test Project #3',
    description: 'A project where you are the supervisor',
    owner: MOCK_API_USERS[2] as IUser,
    teamMembers: [
      { ...responseGetOwnUser, role: UserRole.Supervisor },
      { ...MOCK_API_USERS[1], role: UserRole.Worker },
      { ...MOCK_API_USERS[2], role: UserRole.Admin }
    ] as IUser[]
  },
];

const responseGetProjectById = (projectId: string) => {
  return MOCK_API_PROJECTS.find(p => p.id === projectId);
}

// Bootrapping all constants
export const ApiResponses = {
  getProjectById: responseGetProjectById,
  getUser: responseGetOwnUser,
  ownProjects: MOCK_API_PROJECTS
};
