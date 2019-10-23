// @flow
import {isValidDate} from '../libs/validators';

export default class Goal {
    id: string;
    completed: boolean;
    goalDate: Date;
    parentGoalId: string;
    title: string;
    detail: string;
    created: Date;
    updated: Date;
    snoozed: boolean;
    remind: Date;
    submittedForReview: boolean;
    requiresReview: boolean;
    congratulationsViewed: boolean;
    

    constructor(args = {}) {
        this.id = typeof args.id === 'string'
            ? args.id
            : null;
        this.parentGoalId = typeof args.parentGoalId === 'string'
            ? args.id
            : null;
        this.title = typeof args.title === 'string'
            ? args.title.trim()
            : null;
        this.detail = typeof args.detail === 'string'
            ? args.detail.trim()
            : null;
        this.created = isValidDate(args.created)
            ? new Date(args.created)
            : null;
        this.updated = isValidDate(args.updated)
            ? new Date(args.updated)
            : null;
        this.remind = isValidDate(args.remind)
            ? new Date(args.remind)
            : null;
        this.goalDate = isValidDate(args.goalDate)
            ? new Date(args.goalDate)
            : null;
        this.completed = typeof args.completed === 'boolean' ? args.completed : false;
        this.snoozed = typeof args.snoozed === 'boolean' ? args.snoozed : false;
        this.submittedForReview = typeof args.submittedForReview === 'boolean' ? args.submittedForReview : false;
        this.requiresReview = typeof args.requiresReview === 'boolean' ? args.requiresReview : false;
        this.congratulationsViewed = typeof args.congratulationsViewed === 'boolean' ? args.congratulationsViewed : false;
    }

    static create(args: ?Object = {}, id?: string) {
        const _args = {...args};
        if (Boolean(id)) {
            _args.id = id;
        }
        // Remove inheritance.  POJO's only
        return JSON.parse(JSON.stringify(new Goal(_args)));
    }
}