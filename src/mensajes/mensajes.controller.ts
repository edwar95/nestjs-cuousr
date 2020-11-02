import {Body, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {CreateMensajesDto} from "./dto/create-mensajes-dto";

@Controller('mensajes')
export class MensajesController {

  @Post()
  create(@Body() createMensajeDto:CreateMensajesDto){
    return "mensaje creado"
  }

  @Get()
  getAll(){
    return "lista de mensajes"
  }

  @Put(":id")
  update(@Body() updateMensajeDto:CreateMensajesDto){
    return "mensaje actualizado"
  }

  @Delete(":id")
  delete(){
    return "mensaje eliminado"
  }
}
