export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'member' | 'staff' | 'board' | 'admin'
export type ReservationType = 'swim_lane' | 'tennis_court'
export type ReservationStatus = 'confirmed' | 'cancelled'
export type BlockType = 'weekly' | 'one_off'
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
export type ApplicationStatus = 'pending' | 'reviewed' | 'interviewed' | 'hired' | 'declined'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          role: UserRole
          household_id: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: UserRole
          household_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          role?: UserRole
          household_id?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      households: {
        Row: {
          id: string
          name: string
          address_line1: string | null
          address_line2: string | null
          city: string
          state: string
          zip: string | null
          primary_contact_id: string | null
          membership_type: string
          membership_status: string
          guest_passes_remaining: number
          account_balance: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address_line1?: string | null
          address_line2?: string | null
          city?: string
          state?: string
          zip?: string | null
          primary_contact_id?: string | null
          membership_type?: string
          membership_status?: string
          guest_passes_remaining?: number
          account_balance?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address_line1?: string | null
          address_line2?: string | null
          city?: string
          state?: string
          zip?: string | null
          primary_contact_id?: string | null
          membership_type?: string
          membership_status?: string
          guest_passes_remaining?: number
          account_balance?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          event_date: string
          start_time: string | null
          end_time: string | null
          location: string | null
          category: string | null
          max_participants: number | null
          registration_required: boolean
          registration_deadline: string | null
          member_price: number
          guest_price: number | null
          status: EventStatus
          image_url: string | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          event_date: string
          start_time?: string | null
          end_time?: string | null
          location?: string | null
          category?: string | null
          max_participants?: number | null
          registration_required?: boolean
          registration_deadline?: string | null
          member_price?: number
          guest_price?: number | null
          status?: EventStatus
          image_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          event_date?: string
          start_time?: string | null
          end_time?: string | null
          location?: string | null
          category?: string | null
          max_participants?: number | null
          registration_required?: boolean
          registration_deadline?: string | null
          member_price?: number
          guest_price?: number | null
          status?: EventStatus
          image_url?: string | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      event_registrations: {
        Row: {
          id: string
          event_id: string
          profile_id: string
          household_id: string | null
          num_members: number
          num_guests: number
          total_price: number
          payment_status: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          profile_id: string
          household_id?: string | null
          num_members?: number
          num_guests?: number
          total_price?: number
          payment_status?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          profile_id?: string
          household_id?: string | null
          num_members?: number
          num_guests?: number
          total_price?: number
          payment_status?: string
          notes?: string | null
          created_at?: string
        }
      }
      reservations: {
        Row: {
          id: string
          reservation_type: ReservationType
          resource_id: number
          reservation_date: string
          start_time: string
          end_time: string
          subslot: string | null
          duration_minutes: number
          member_name: string
          profile_id: string | null
          household_id: string | null
          booking_type: string | null
          status: ReservationStatus
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reservation_type: ReservationType
          resource_id: number
          reservation_date: string
          start_time: string
          end_time: string
          subslot?: string | null
          duration_minutes: number
          member_name: string
          profile_id?: string | null
          household_id?: string | null
          booking_type?: string | null
          status?: ReservationStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reservation_type?: ReservationType
          resource_id?: number
          reservation_date?: string
          start_time?: string
          end_time?: string
          subslot?: string | null
          duration_minutes?: number
          member_name?: string
          profile_id?: string | null
          household_id?: string | null
          booking_type?: string | null
          status?: ReservationStatus
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reservation_blocks: {
        Row: {
          id: string
          reservation_type: ReservationType
          resource_id: number
          block_type: BlockType
          day_of_week: number | null
          block_date: string | null
          start_time: string
          end_time: string
          reason: string
          subslot: string | null
          is_active: boolean
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reservation_type: ReservationType
          resource_id: number
          block_type: BlockType
          day_of_week?: number | null
          block_date?: string | null
          start_time: string
          end_time: string
          reason: string
          subslot?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reservation_type?: ReservationType
          resource_id?: number
          block_type?: BlockType
          day_of_week?: number | null
          block_date?: string | null
          start_time?: string
          end_time?: string
          reason?: string
          subslot?: string | null
          is_active?: boolean
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      guest_passes: {
        Row: {
          id: string
          household_id: string
          guest_name: string
          visit_date: string
          pass_type: string
          price_paid: number | null
          checked_in_at: string | null
          checked_in_by: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          household_id: string
          guest_name: string
          visit_date: string
          pass_type?: string
          price_paid?: number | null
          checked_in_at?: string | null
          checked_in_by?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          household_id?: string
          guest_name?: string
          visit_date?: string
          pass_type?: string
          price_paid?: number | null
          checked_in_at?: string | null
          checked_in_by?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          household_id: string | null
          profile_id: string | null
          item_type: string
          item_id: string | null
          description: string
          quantity: number
          unit_price: number
          total_price: number
          payment_method: string | null
          payment_status: string
          stripe_payment_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          household_id?: string | null
          profile_id?: string | null
          item_type: string
          item_id?: string | null
          description: string
          quantity?: number
          unit_price: number
          total_price: number
          payment_method?: string | null
          payment_status?: string
          stripe_payment_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          household_id?: string | null
          profile_id?: string | null
          item_type?: string
          item_id?: string | null
          description?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          payment_method?: string | null
          payment_status?: string
          stripe_payment_id?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          subject: string
          message: string
          status: string
          replied_at: string | null
          replied_by: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          subject: string
          message: string
          status?: string
          replied_at?: string | null
          replied_by?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          subject?: string
          message?: string
          status?: string
          replied_at?: string | null
          replied_by?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          position: string
          age: number | null
          start_date: string | null
          experience: string | null
          certifications: string[] | null
          availability: string[] | null
          about: string | null
          status: ApplicationStatus
          reviewed_at: string | null
          reviewed_by: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          position: string
          age?: number | null
          start_date?: string | null
          experience?: string | null
          certifications?: string[] | null
          availability?: string[] | null
          about?: string | null
          status?: ApplicationStatus
          reviewed_at?: string | null
          reviewed_by?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          position?: string
          age?: number | null
          start_date?: string | null
          experience?: string | null
          certifications?: string[] | null
          availability?: string[] | null
          about?: string | null
          status?: ApplicationStatus
          reviewed_at?: string | null
          reviewed_by?: string | null
          notes?: string | null
          created_at?: string
        }
      }
      lesson_registrations: {
        Row: {
          id: string
          lesson_type: string
          sport: string
          instructor_name: string
          student_name: string
          student_age: number | null
          profile_id: string | null
          household_id: string | null
          session_date: string | null
          session_time: string | null
          duration_minutes: number | null
          price: number | null
          payment_status: string
          status: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lesson_type: string
          sport: string
          instructor_name: string
          student_name: string
          student_age?: number | null
          profile_id?: string | null
          household_id?: string | null
          session_date?: string | null
          session_time?: string | null
          duration_minutes?: number | null
          price?: number | null
          payment_status?: string
          status?: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lesson_type?: string
          sport?: string
          instructor_name?: string
          student_name?: string
          student_age?: number | null
          profile_id?: string | null
          household_id?: string | null
          session_date?: string | null
          session_time?: string | null
          duration_minutes?: number | null
          price?: number | null
          payment_status?: string
          status?: string
          notes?: string | null
          created_at?: string
        }
      }
      team_registrations: {
        Row: {
          id: string
          team_type: string
          season_year: number
          swimmer_name: string
          swimmer_age: number
          profile_id: string | null
          household_id: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          medical_notes: string | null
          previous_experience: string | null
          tshirt_size: string | null
          registration_fee: number | null
          payment_status: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          team_type: string
          season_year: number
          swimmer_name: string
          swimmer_age: number
          profile_id?: string | null
          household_id?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          medical_notes?: string | null
          previous_experience?: string | null
          tshirt_size?: string | null
          registration_fee?: number | null
          payment_status?: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          team_type?: string
          season_year?: number
          swimmer_name?: string
          swimmer_age?: number
          profile_id?: string | null
          household_id?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          medical_notes?: string | null
          previous_experience?: string | null
          tshirt_size?: string | null
          registration_fee?: number | null
          payment_status?: string
          status?: string
          created_at?: string
        }
      }
      check_ins: {
        Row: {
          id: string
          profile_id: string | null
          household_id: string | null
          member_name: string
          check_in_time: string
          check_in_type: string
          checked_in_by: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          profile_id?: string | null
          household_id?: string | null
          member_name: string
          check_in_time?: string
          check_in_type?: string
          checked_in_by?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          profile_id?: string | null
          household_id?: string | null
          member_name?: string
          check_in_time?: string
          check_in_type?: string
          checked_in_by?: string | null
          notes?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: UserRole
      reservation_type: ReservationType
      reservation_status: ReservationStatus
      block_type: BlockType
      event_status: EventStatus
      application_status: ApplicationStatus
    }
  }
}

// Helper types for convenience
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Household = Database['public']['Tables']['households']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type EventRegistration = Database['public']['Tables']['event_registrations']['Row']
export type Reservation = Database['public']['Tables']['reservations']['Row']
export type ReservationBlock = Database['public']['Tables']['reservation_blocks']['Row']
export type GuestPass = Database['public']['Tables']['guest_passes']['Row']
export type Purchase = Database['public']['Tables']['purchases']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
export type JobApplication = Database['public']['Tables']['job_applications']['Row']
export type LessonRegistration = Database['public']['Tables']['lesson_registrations']['Row']
export type TeamRegistration = Database['public']['Tables']['team_registrations']['Row']
export type CheckIn = Database['public']['Tables']['check_ins']['Row']
