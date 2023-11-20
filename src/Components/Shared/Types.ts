export type ContentType = {
      id: string,
      color: string
   }[]

   export type UsersType = {
      id: "",
      pk_usersset?: ""
      name: ""
      country: "",
      region?: "",
      latlng?: ""
      personal_quote?: ""
      salary: "",
      birthday?: "",
      entry_date: "",
      address: "",
      phone: "",
      experience_score: number,
      favorite_food?: ""
      [key: string]: string | number | undefined;
   }[]