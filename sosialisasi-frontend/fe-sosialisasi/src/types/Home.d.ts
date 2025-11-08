export interface IUser {
  _id: string;
  fullName: string;
  profilePicture: string;
}

export interface IComment {
  _id: string;
  text_comment: string;
  id_user: IUser;
  created_at_comment: string;
}

export interface IPost {
  _id: string;
  text_content: string;
  attachmentUrl_content?: string;
  type_content: string;
  created_at_content: string;
  userId: IUser;
  likes: string[];
  comments: (string | IComment)[];
}

export interface IUserSearchResult {
  _id: string;
  fullName: string;
  profilePicture: string;
  status: string;
  universitas: string;
}

export interface ISearchResult {
  users: IUserSearchResult[];
  contents: IPost[];
}

export interface IConnection {
  user: IUser;
  status: "pending" | "accepted";
  role: "sender" | "receiver";
  created_at_connection: string;
}
