import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'recetas-app',
  webDir: 'dist/recetas-app/browser',
  plugins: {
    Camera: {
      allowEditing: false,
      resultType: 'DataUrl',
      quality: 90,
    },
  },
};

export default config;
