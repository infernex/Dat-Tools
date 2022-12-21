export class Skill{
    
    skillId: number;
    codSkill : string;
    description : string;
    fkCourseId : number;
    UsuarioCreacion :string;
    FechaCreacion :Date;
    courseName:string;

constructor(){
  this.skillId = 0;
  this.description = null;
    this.codSkill = null;
    this.fkCourseId = 0;
    this.UsuarioCreacion;
    this.FechaCreacion;
    this.courseName=null;
  
   }

}