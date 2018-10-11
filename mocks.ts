import { Lead, Location, Company, Booking } from './types'

export const mockLeads: Lead[] = [
  { id: 'lead1', firstName: 'LeadOne', lastName: 'OneLastLeadName' },
  { id: 'lead2', firstName: 'LeadTwo', lastName: 'TwoLastLeadName' },
  { id: 'lead3', firstName: 'LeadThree', lastName: 'ThreeLastLeadName' },
  { id: 'lead4', firstName: 'LeadFour', lastName: 'FourLastLeadName' },
  { id: 'lead5', firstName: 'LeadFive', lastName: 'FiveLastLeadName' }
]

export const mockLocations: Location[] = [
  { id: 'loc1', name: 'LocationOne', Company: 'c1' },
  { id: 'loc2', name: 'LocationTwo', Company: 'c2' },
  { id: 'loc3', name: 'LocationThree', Company: 'c3' },
  { id: 'loc4', name: 'LocationFour', Company: 'c4' },
  { id: 'loc5', name: 'LocationFive', Company: 'c5' }
]

export const mockCompanies: Company[] = [
  { id: 'c1', name: 'CompanyOne' },
  { id: 'c2', name: 'CompanyTwo' },
  { id: 'c3', name: 'CompanyThree' },
  { id: 'c4', name: 'CompanyFour' },
  { id: 'c5', name: 'CompanyFive' }
]

export const mockBookings: Booking[] = [
  { id: 'book1', name: 'BookingOne', Company: 'c1', Location: 'loc1', Lead: 'lead1' },
  { id: 'book2', name: 'BookingTwo', Company: 'c2', Location: 'loc2', Lead: 'lead2' },
  { id: 'book3', name: 'BookingThree', Company: 'c3', Location: 'loc3', Lead: 'lead3' },
  { id: 'book4', name: 'BookingFour', Company: 'c4', Location: 'loc4', Lead: 'lead4' },
  { id: 'book5', name: 'BookingFive', Company: 'c5', Location: 'loc5', Lead: 'lead5' }
]
