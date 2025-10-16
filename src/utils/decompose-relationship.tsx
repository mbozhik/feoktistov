import type {Member, Media, ProjectCategory} from '@payload-types'

export function decomposeMember(member: string | Member | null | undefined) {
  // If member is not provided or empty
  if (!member) {
    return {
      id: '',
      name: '',
      position: [],
      picture: null,
      slug: '',
      contacts: {phone: 0, email: ''},
      education: [],
      awards: [],
      about: [],
    }
  }

  // If member is a string (could be name or ID)
  if (typeof member === 'string') {
    return {
      id: member,
      name: member,
      position: [],
      picture: null,
      slug: '',
      contacts: {phone: 0, email: ''},
      education: [],
      awards: [],
      about: [],
    }
  }

  // If member is a Member object from PayloadCMS
  return {
    id: member.id,
    name: member.name,
    position: member.position,
    picture: member.picture,
    slug: member.slug,
    contacts: member.contacts,
    education: member.education,
    awards: member.awards,
    about: member.about,
  }
}

export function decomposeTeamMembers(
  teamMembers: Array<{
    member: string | Member
    role: 'advocate' | 'lawyer'
    id?: string | null
  }>,
) {
  return teamMembers.map((teamMember) => ({
    ...decomposeMember(teamMember.member),
    role: teamMember.role,
    id: teamMember.id,
  }))
}

export function decomposeMedia(media: string | Media | null | undefined) {
  //  If media is not provided or empty
  if (!media) {
    return {
      url: null,
      alt: '',
      width: null,
      height: null,
      filename: null,
      mimeType: null,
      filesize: null,
    }
  }

  // If media is a string (direct URL)
  if (typeof media === 'string') {
    return {
      url: media,
      alt: '',
      width: null,
      height: null,
      filename: null,
      mimeType: null,
      filesize: null,
    }
  }

  // If media is a Media object from PayloadCMS
  return {
    url: media.url || null,
    alt: media.alt || '',
    width: media.width || null,
    height: media.height || null,
    filename: media.filename || null,
    mimeType: media.mimeType || null,
    filesize: media.filesize || null,
  }
}

export function decomposeProjectCategory(category: string | ProjectCategory | null | undefined) {
  // If category is not provided or empty
  if (!category) {
    return {
      id: '',
      type: 'defense' as const,
      definition: '',
      description: '',
      slug: '',
    }
  }

  // If category is a string (ID of category)
  if (typeof category === 'string') {
    return {
      id: category,
      type: 'defense' as const,
      definition: '',
      description: '',
      slug: '',
    }
  }

  // If category is a ProjectCategory object from PayloadCMS
  return {
    id: category.id,
    type: category.type,
    definition: category.definition,
    description: category.description,
    slug: category.slug,
  }
}
