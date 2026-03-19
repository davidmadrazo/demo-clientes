export interface SectorConfig {
  value: string
  label: string
  suggestedQuestions: string[]
}

export const sectors: SectorConfig[] = [
  {
    value: 'restaurante',
    label: 'Restaurante / Cafeteria',
    suggestedQuestions: [
      '¿Cual es el menu del dia?',
      '¿Hacen envios a domicilio?',
      '¿Tienen opciones vegetarianas?',
      '¿Se puede reservar mesa?',
    ],
  },
  {
    value: 'peluqueria',
    label: 'Peluqueria / Barberia',
    suggestedQuestions: [
      '¿Que servicios ofrecen?',
      '¿Cuanto cuesta un corte de pelo?',
      '¿Puedo reservar cita para hoy?',
      '¿Trabajan los sabados?',
    ],
  },
  {
    value: 'tienda',
    label: 'Tienda / Comercio',
    suggestedQuestions: [
      '¿Tienen este producto en stock?',
      '¿Hacen envios?',
      '¿Cual es la politica de devoluciones?',
      '¿Tienen descuentos?',
    ],
  },
  {
    value: 'clinica',
    label: 'Clinica / Salud',
    suggestedQuestions: [
      '¿Que especialidades atienden?',
      '¿Puedo pedir cita?',
      '¿Aceptan seguro medico?',
      '¿Cual es el horario de atencion?',
    ],
  },
  {
    value: 'inmobiliaria',
    label: 'Inmobiliaria',
    suggestedQuestions: [
      '¿Tienen pisos en alquiler?',
      '¿Que zonas manejan?',
      '¿Cual es el precio medio?',
      '¿Puedo agendar una visita?',
    ],
  },
  {
    value: 'academia',
    label: 'Academia / Formacion',
    suggestedQuestions: [
      '¿Que cursos ofrecen?',
      '¿Cual es el precio?',
      '¿Son clases presenciales u online?',
      '¿Cuando empieza el proximo grupo?',
    ],
  },
  {
    value: 'gimnasio',
    label: 'Gimnasio / Deporte',
    suggestedQuestions: [
      '¿Que planes tienen?',
      '¿Puedo hacer una clase de prueba?',
      '¿Cual es el horario?',
      '¿Tienen entrenador personal?',
    ],
  },
  {
    value: 'hotel',
    label: 'Hotel / Alojamiento',
    suggestedQuestions: [
      '¿Tienen habitaciones disponibles?',
      '¿Cual es el precio por noche?',
      '¿El desayuno esta incluido?',
      '¿Tienen parking?',
    ],
  },
  {
    value: 'taller',
    label: 'Taller Mecanico',
    suggestedQuestions: [
      '¿Pueden revisar mi coche hoy?',
      '¿Cuanto cuesta una revision?',
      '¿Trabajan con cita previa?',
      '¿Tienen servicio de grua?',
    ],
  },
  {
    value: 'otro',
    label: 'Otro',
    suggestedQuestions: [
      '¿Que servicios ofrecen?',
      '¿Cual es el horario?',
      '¿Como puedo contactarles?',
      '¿Donde estan ubicados?',
    ],
  },
]

export function getSectorByValue(value: string): SectorConfig | undefined {
  return sectors.find(s => s.value === value)
}
