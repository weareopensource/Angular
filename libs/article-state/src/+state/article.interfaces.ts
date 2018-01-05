import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Article } from "../models/article.model";


export interface ArticleState extends EntityState<Article> { }
export const articleAdapter: EntityAdapter<Article> = createEntityAdapter<Article>();
