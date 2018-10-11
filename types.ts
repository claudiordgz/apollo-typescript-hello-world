
export interface Lead {
  id: string
  firstName: string
  lastName: string
}

export interface Location {
  id: string
  name: string
  Company: string
}

export interface Company {
  id: string
  name: string
}

export interface Booking {
  id: string
  name: string
  Company: string
  Location: string
  Lead: string
}
