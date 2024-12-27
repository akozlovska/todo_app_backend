import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateISO: { input: any; output: any; }
  MaxLengthDescription: { input: any; output: any; }
  MaxLengthTitle: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
};

export type Metadata = {
  __typename?: 'Metadata';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  limit: Scalars['PositiveInt']['output'];
  page: Scalars['PositiveInt']['output'];
  total: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeAllTasks?: Maybe<Array<Maybe<Task>>>;
  createTask?: Maybe<Task>;
  deleteTask?: Maybe<Scalars['String']['output']>;
  updateTask?: Maybe<Task>;
};


export type MutationCreateTaskArgs = {
  input: TaskInput;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['ID']['input'];
  input: TaskInput;
};

export type Query = {
  __typename?: 'Query';
  task?: Maybe<Task>;
  tasks?: Maybe<TasksResponse>;
};


export type QueryTaskArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTasksArgs = {
  input?: InputMaybe<TasksInput>;
};

export type Task = {
  __typename?: 'Task';
  completed?: Maybe<Scalars['Boolean']['output']>;
  description: Scalars['MaxLengthDescription']['output'];
  dueDate: Scalars['DateISO']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['MaxLengthTitle']['output'];
};

export type TaskInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description: Scalars['MaxLengthDescription']['input'];
  dueDate: Scalars['DateISO']['input'];
  title: Scalars['MaxLengthTitle']['input'];
};

export type TasksFilters = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  from?: InputMaybe<Scalars['DateISO']['input']>;
  to?: InputMaybe<Scalars['DateISO']['input']>;
};

export type TasksInput = {
  pagination?: InputMaybe<TasksPagination>;
  query?: InputMaybe<TasksFilters>;
};

export type TasksPagination = {
  limit: Scalars['PositiveInt']['input'];
  page: Scalars['PositiveInt']['input'];
};

export type TasksResponse = {
  __typename?: 'TasksResponse';
  metadata?: Maybe<Metadata>;
  taskList?: Maybe<Array<Maybe<Task>>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  DateISO: ResolverTypeWrapper<Scalars['DateISO']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MaxLengthDescription: ResolverTypeWrapper<Scalars['MaxLengthDescription']['output']>;
  MaxLengthTitle: ResolverTypeWrapper<Scalars['MaxLengthTitle']['output']>;
  Metadata: ResolverTypeWrapper<Metadata>;
  Mutation: ResolverTypeWrapper<{}>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Task: ResolverTypeWrapper<Task>;
  TaskInput: TaskInput;
  TasksFilters: TasksFilters;
  TasksInput: TasksInput;
  TasksPagination: TasksPagination;
  TasksResponse: ResolverTypeWrapper<TasksResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  DateISO: Scalars['DateISO']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  MaxLengthDescription: Scalars['MaxLengthDescription']['output'];
  MaxLengthTitle: Scalars['MaxLengthTitle']['output'];
  Metadata: Metadata;
  Mutation: {};
  PositiveInt: Scalars['PositiveInt']['output'];
  Query: {};
  String: Scalars['String']['output'];
  Task: Task;
  TaskInput: TaskInput;
  TasksFilters: TasksFilters;
  TasksInput: TasksInput;
  TasksPagination: TasksPagination;
  TasksResponse: TasksResponse;
};

export interface DateIsoScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateISO'], any> {
  name: 'DateISO';
}

export interface MaxLengthDescriptionScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MaxLengthDescription'], any> {
  name: 'MaxLengthDescription';
}

export interface MaxLengthTitleScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MaxLengthTitle'], any> {
  name: 'MaxLengthTitle';
}

export type MetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['Metadata'] = ResolversParentTypes['Metadata']> = {
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  limit?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['PositiveInt'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  completeAllTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  createTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'input'>>;
  deleteTask?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'id'>>;
  updateTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<MutationUpdateTaskArgs, 'id' | 'input'>>;
};

export interface PositiveIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, RequireFields<QueryTaskArgs, 'id'>>;
  tasks?: Resolver<Maybe<ResolversTypes['TasksResponse']>, ParentType, ContextType, Partial<QueryTasksArgs>>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['MaxLengthDescription'], ParentType, ContextType>;
  dueDate?: Resolver<ResolversTypes['DateISO'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['MaxLengthTitle'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TasksResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TasksResponse'] = ResolversParentTypes['TasksResponse']> = {
  metadata?: Resolver<Maybe<ResolversTypes['Metadata']>, ParentType, ContextType>;
  taskList?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateISO?: GraphQLScalarType;
  MaxLengthDescription?: GraphQLScalarType;
  MaxLengthTitle?: GraphQLScalarType;
  Metadata?: MetadataResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PositiveInt?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TasksResponse?: TasksResponseResolvers<ContextType>;
};

