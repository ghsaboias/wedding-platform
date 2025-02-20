export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      contributions: {
        Row: {
          amount: number
          contributor_email: string
          contributor_name: string
          created_at: string
          gift_id: string
          id: string
          message: string | null
          thank_you_message: string | null
          thanked_at: string | null
        }
        Insert: {
          amount: number
          contributor_email: string
          contributor_name: string
          created_at?: string
          gift_id: string
          id?: string
          message?: string | null
          thank_you_message?: string | null
          thanked_at?: string | null
        }
        Update: {
          amount?: number
          contributor_email?: string
          contributor_name?: string
          created_at?: string
          gift_id?: string
          id?: string
          message?: string | null
          thank_you_message?: string | null
          thanked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contributions_gift_id_fkey"
            columns: ["gift_id"]
            isOneToOne: false
            referencedRelation: "gifts"
            referencedColumns: ["id"]
          },
        ]
      }
      gifts: {
        Row: {
          category_id: string | null
          created_at: string
          current_contributions: number | null
          description: string | null
          id: string
          image_url: string | null
          is_group_gift: boolean | null
          min_contribution: number | null
          suggested_contribution: number | null
          title: string
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          current_contributions?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_group_gift?: boolean | null
          min_contribution?: number | null
          suggested_contribution?: number | null
          title: string
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: string | null
          created_at?: string
          current_contributions?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_group_gift?: boolean | null
          min_contribution?: number | null
          suggested_contribution?: number | null
          title?: string
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gifts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          couple_id: string
          created_at: string
          dietary_restrictions: string | null
          email: string | null
          id: string
          name: string
          notes: string | null
          number_of_companions: number | null
          phone: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          couple_id: string
          created_at?: string
          dietary_restrictions?: string | null
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          number_of_companions?: number | null
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          couple_id?: string
          created_at?: string
          dietary_restrictions?: string | null
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          number_of_companions?: number | null
          phone?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      wedding_info: {
        Row: {
          bride_name: string | null
          ceremony_time: string | null
          created_at: string
          groom_name: string | null
          id: string
          reception_time: string | null
          story: string | null
          updated_at: string
          venue_address: string | null
          venue_name: string | null
          wedding_date: string | null
        }
        Insert: {
          bride_name?: string | null
          ceremony_time?: string | null
          created_at?: string
          groom_name?: string | null
          id: string
          reception_time?: string | null
          story?: string | null
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
          wedding_date?: string | null
        }
        Update: {
          bride_name?: string | null
          ceremony_time?: string | null
          created_at?: string
          groom_name?: string | null
          id?: string
          reception_time?: string | null
          story?: string | null
          updated_at?: string
          venue_address?: string | null
          venue_name?: string | null
          wedding_date?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
