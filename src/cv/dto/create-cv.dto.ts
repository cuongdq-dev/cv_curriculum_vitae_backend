import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';

export class CreateCVDto {

  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the CV',
  })
  @Prop({
    required: true,
    index: { unique: true },
    default: () => randomUUID(),
  })
  cvId?: string


  @ApiProperty({
    example: 'Alex Johnson',
    description: 'The name of the individual',
  })
  @Prop({ required: true, trim: true })
  name?: string

  @ApiProperty({
    example: 'Software Engineer',
    description: 'The occupation of the individual',
  })
  @Prop({ required: true, trim: true })
  occupation?: string

  @ApiProperty({
    example: 'Passionate software engineer with a focus on building scalable web applications and a love for clean code.',
    description: 'A brief description of the individual',
  })
  @Prop({ required: true, trim: true })
  description?: string

  @ApiProperty({
    example: 'alexjohnson.jpg',
    description: 'Profile image file name',
  })
  @Prop({ required: true })
  image?: string

  @ApiProperty({
    example: 'I enjoy working with modern technologies, including React and Node.js...',
    description: 'A personal bio of the individual',
  })
  @Prop({ required: true })
  bio?: string

  @ApiProperty({
    example: 'Feel free to reach out if you’d like to connect or discuss opportunities!',
    description: 'Contact message for readers',
  })
  @Prop({ required: true })
  contactmessage?: string

  @ApiProperty({
    example: 'alexjohnson@gmail.com',
    description: 'The email of the individual',
  })
  @Prop({ required: true, lowercase: true })
  email?: string

  @ApiProperty({
    example: '555-123-4567',
    description: 'The phone number of the individual',
  })
  @Prop()
  phone?: string

  @ApiProperty({
    description: 'The address of the individual',
  })
  @Prop({ type: Object })
  address?: {
    street?: string
    city?: string
    state?: string
    zip?: string
  };

  @ApiProperty({
    example: 'http://www.alexjohnsondev.com',
    description: 'The personal website of the individual',
  })
  @Prop()
  website?: string

  @ApiProperty({
    example: 'http://alexjohnsondev.com/resume.pdf',
    description: 'Link to download the resume',
  })
  @Prop()
  resumedownload?: string

  @ApiProperty({
    description: 'Social media accounts',
  })
  @Prop({ type: [{ name: String, url: String, className: String }] })
  social?: Array<{
    name?: string
    url?: string
    className?: string
  }>;

  @ApiProperty({
    example: 'I have a strong foundation in web development...',
    description: 'A short message about skills',
  })
  @Prop()
  skillmessage?: string

  @ApiProperty({
    description: 'The educational background of the individual',
  })
  @Prop({ type: [{ school: String, degree: String, graduated: String, description: String }] })
  education?: Array<{
    school?: string
    degree?: string
    graduated?: string
    description?: string
  }>;

  @ApiProperty({
    description: 'Work experience of the individual',
  })
  @Prop({ type: [{ company: String, title: String, years: String, description: String }] })
  work?: Array<{
    company?: string
    title?: string
    years?: string
    description?: string
  }>;

  @ApiProperty({
    description: 'Skills of the individual',
  })
  @Prop({ type: [{ name: String, level: String }] })
  skills?: Array<{
    name?: string
    level?: string
  }>;

  @ApiProperty({
    description: 'Projects completed by the individual',
  })
  @Prop({ type: [{ title: String, category: String, image: String, url: String }] })
  projects?: Array<{
    title?: string
    category?: string
    image?: string
    url?: string
  }>;

  @ApiProperty({
    description: 'Testimonials about the individual',
  })
  @Prop({ type: [{ text: String, user: String }] })
  testimonials?: Array<{
    text?: string
    user?: string
  }>;
}
