import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, Sparkles, Zap, Shield, Rocket } from 'lucide-react';

// Tipos de notificación
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (toast: Omit<Toast, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Componente individual de toast ultra-futurista
const ToastComponent: React.FC<{ toast: Toast; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-400" />;
      case 'info':
        return <Info className="w-6 h-6 text-neon-blue" />;
      default:
        return <Sparkles className="w-6 h-6 text-neon-purple" />;
    }
  };

  const getStyles = () => {
    switch (toast.type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-teal-500/10',
          border: 'border-emerald-500/30',
          accent: 'bg-gradient-to-br from-emerald-400 to-green-500'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500/10 via-rose-500/10 to-pink-500/10',
          border: 'border-red-500/30',
          accent: 'bg-gradient-to-br from-red-400 to-rose-500'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10',
          border: 'border-amber-500/30',
          accent: 'bg-gradient-to-br from-amber-400 to-orange-500'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10',
          border: 'border-neon-blue/30',
          accent: 'bg-gradient-to-br from-neon-blue to-neon-purple'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-neon-purple/10 via-neon-blue/10 to-neon-pink/10',
          border: 'border-neon-purple/30',
          accent: 'bg-gradient-to-br from-neon-purple to-neon-blue'
        };
    }
  };

  const styles = getStyles();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-2xl p-6 shadow-neon-lg slide-up-cosmic relative overflow-hidden backdrop-blur-ultra`}>
      {/* Efecto de brillo deslizante */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"></div>
      
      {/* Efecto de pulso de fondo */}
      <div className={`absolute inset-0 ${toast.type === 'success' ? 'bg-emerald-500/5' : toast.type === 'error' ? 'bg-red-500/5' : toast.type === 'warning' ? 'bg-amber-500/5' : 'bg-neon-blue/5'} animate-pulse`}></div>
      
      <div className="relative z-10 flex items-start space-x-4">
        <div className={`p-3 rounded-xl ${styles.accent} shadow-neon-sm pulse-neon`}>
          {getIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-futuristic font-bold text-sm tracking-wider text-foreground">
              {toast.type === 'success' && '✨ OPERACIÓN EXITOSA'}
              {toast.type === 'error' && '⚠️ ERROR DEL SISTEMA'}
              {toast.type === 'warning' && '🔔 ALERTA NEURAL'}
              {toast.type === 'info' && '💡 INFORMACIÓN CUÁNTICA'}
            </h4>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
          
          <h3 className="font-bold text-foreground mb-2">{toast.title}</h3>
          {toast.description && (
            <p className="text-sm text-muted-foreground">{toast.description}</p>
          )}
          
          {/* Efectos adicionales para éxito */}
          {toast.type === 'success' && (
            <div className="flex items-center space-x-2 mt-3">
              <Rocket className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span className="text-xs font-mono text-emerald-300 tracking-wider">
                DATOS SINCRONIZADOS EN LA MATRIZ CUÁNTICA
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden">
        <div 
          className={`h-full ${styles.accent} animate-pulse`}
          style={{
            animation: `shrink ${toast.duration || 5000}ms linear forwards`
          }}
        />
      </div>
    </div>
  );
};

// Contenedor de toasts
const ToastContainer: React.FC<{ toasts: Toast[]; onDismiss: (id: string) => void }> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-4 max-w-md">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="slide-up-cosmic"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ToastComponent toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};

// Provider del contexto
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...newToast, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

// Hook personalizado
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast debe ser usado dentro de ToastProvider');
  }
  return context;
};

// Funciones de conveniencia
export const toast = {
  success: (title: string, description?: string) => {
    // Esta función será sobrescrita por el hook
    console.log('Toast success:', title, description);
  },
  error: (title: string, description?: string) => {
    console.log('Toast error:', title, description);
  },
  warning: (title: string, description?: string) => {
    console.log('Toast warning:', title, description);
  },
  info: (title: string, description?: string) => {
    console.log('Toast info:', title, description);
  }
};