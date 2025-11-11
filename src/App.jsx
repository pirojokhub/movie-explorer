import AppContent from './AppContent';
import AuthProvider from './auth/AuthContext';
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
export default App;
