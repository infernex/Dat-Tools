import { Injectable, EventEmitter } from '@angular/core';
// import { ChatUser, Topic, Certificate, CourseModule, Course } from '../model/model.api';
import { DashboardCategoriaActiva } from '../model/catdashactiva';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  //observable

  // subTopicId$ = new EventEmitter<number>();

  showContentClass$ = new EventEmitter<boolean>();

  categoriaActivaDash$ = new EventEmitter<DashboardCategoriaActiva>();

  modoAdministrador$ = new EventEmitter<boolean>();

  showPageName$ = new EventEmitter<string>();

  // courseModuleId$ = new EventEmitter<number>();

  // courseId$ = new EventEmitter<number>();
  // canAdmin$ = new EventEmitter<boolean>();

  // course$ = new EventEmitter<Course>();
  // topics$ = new EventEmitter<Topic[]>();
  // courseModules$ = new EventEmitter<CourseModule[]>();

  // chats$ = new EventEmitter<ChatUser[]>();

  // chatsInit$: ChatUser[] = [];

  // certificateId$ = new EventEmitter<number>();
  // certificate$ = new EventEmitter<Certificate>();

  activateFullFooter$ = new EventEmitter<boolean>();

  //pageLiveDatClass$ = new EventEmitter<boolean>();







  constructor() { }
}
