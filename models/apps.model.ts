export interface Application {
  name: string;
  desc: string;
  features: [Features];
  iconUrl: string;
  path?: string;
}

interface Features {
  name: string;
}
