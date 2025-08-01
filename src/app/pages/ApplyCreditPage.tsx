import React, { useState, memo, useMemo, useCallback, Suspense, lazy } from 'react';
import { SectionSuspenseFallback } from '../components/LazyLoading';

// Lazy load form components
const LoanCalculator = lazy(() => import('../components/credit/LoanCalculator'));

interface CreditProduct {
  id: string;
  title: string;
  type: 'personal' | 'hipotecario' | 'vehiculo' | 'tarjeta';
  rate: number;
  minAmount: number;
  maxAmount: number;
  minTerm: number;
  maxTerm: number;
  features: string[];
  requirements: string[];
  description: string;
}

interface ApplicationForm {
  productId: string;
  requestedAmount: number;
  term: number;
  monthlyIncome: number;
  purpose: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    id: string;
  };
}

const ApplyCreditPage: React.FC = memo(() => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<CreditProduct | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mock data optimizado con useMemo
  const creditProducts = useMemo<CreditProduct[]>(() => [
    {
      id: '1',
      title: 'Préstamo Personal',
      type: 'personal',
      rate: 1.8,
      minAmount: 1000000,
      maxAmount: 50000000,
      minTerm: 6,
      maxTerm: 60,
      features: [
        'Aprobación en 24 horas',
        'Sin codeudor hasta $20M',
        'Tasa fija durante todo el plazo',
        'Sin penalidad por pago anticipado'
      ],
      requirements: [
        'Ingresos mínimos $1,500,000',
        'Antigüedad laboral 6 meses',
        'Buen historial crediticio',
        'Documento de identidad'
      ],
      description: 'Ideal para proyectos personales, consolidación de deudas o gastos imprevistos'
    },
    {
      id: '2',
      title: 'Crédito Hipotecario VIS',
      type: 'hipotecario',
      rate: 1.2,
      minAmount: 50000000,
      maxAmount: 500000000,
      minTerm: 60,
      maxTerm: 240,
      features: [
        'Subsidio de vivienda VIS',
        'Tasa fija los primeros 5 años',
        'Hasta 90% del valor del inmueble',
        'Seguro de vida incluido'
      ],
      requirements: [
        'Ingresos familiares hasta 4 SMMLV',
        'No ser propietario de vivienda',
        'Ahorro programado mínimo 6 meses',
        'Aprobación de la vivienda VIS'
      ],
      description: 'Tu sueño de casa propia con las mejores condiciones y subsidios del gobierno'
    },
    {
      id: '3',
      title: 'Crédito de Vehículo',
      type: 'vehiculo',
      rate: 1.5,
      minAmount: 5000000,
      maxAmount: 150000000,
      minTerm: 12,
      maxTerm: 84,
      features: [
        'Hasta 90% del valor del vehículo',
        'Vehículos nuevos y usados',
        'Seguro todo riesgo incluido',
        'Proceso 100% digital'
      ],
      requirements: [
        'Ingresos mínimos $2,000,000',
        'Cuota inicial desde 10%',
        'Licencia de conducción vigente',
        'Referencias comerciales'
      ],
      description: 'Financia el vehículo de tus sueños con las mejores tasas del mercado'
    },
    {
      id: '4',
      title: 'Tarjeta de Crédito Platinum',
      type: 'tarjeta',
      rate: 2.5,
      minAmount: 500000,
      maxAmount: 30000000,
      minTerm: 1,
      maxTerm: 36,
      features: [
        'Cupo rotativo disponible',
        'Programa de puntos y beneficios',
        'Seguros de viaje incluidos',
        'Compras en cuotas sin interés'
      ],
      requirements: [
        'Ingresos mínimos $3,000,000',
        'Edad entre 18 y 65 años',
        'Centrales de riesgo positivas',
        'Cuenta de ahorros o corriente'
      ],
      description: 'Tarjeta con beneficios exclusivos y el respaldo de nuestra institución'
    }
  ], []);

  const [form, setForm] = useState<ApplicationForm>({
    productId: '',
    requestedAmount: 0,
    term: 12,
    monthlyIncome: 0,
    purpose: '',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      id: ''
    }
  });

  // Callbacks optimizados
  const handleProductSelect = useCallback((product: CreditProduct) => {
    setSelectedProduct(product);
    setForm(prev => ({
      ...prev,
      productId: product.id,
      requestedAmount: product.minAmount,
      term: product.minTerm
    }));
    setCurrentStep(2);
  }, []);

  const handleFormChange = useCallback((field: keyof ApplicationForm, value: string | number) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handlePersonalInfoChange = useCallback((field: keyof ApplicationForm['personalInfo'], value: string) => {
    setForm(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedProduct) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock approval logic
      const approvalProbability = Math.random();
      if (approvalProbability > 0.3) {
        setSubmitSuccess(true);
        setCurrentStep(4);
      } else {
        setSubmitError('Su solicitud no pudo ser aprobada en este momento. Por favor, intente nuevamente o comuníquese con nuestro equipo de asesores.');
      }
    } catch {
      setSubmitError('Error al procesar la solicitud. Intente nuevamente.');
    } finally {
      setSubmitting(false);
    }
  }, [selectedProduct]);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }, []);

  const getProductIcon = useCallback((type: CreditProduct['type']) => {
    switch (type) {
      case 'personal':
        return '💰';
      case 'hipotecario':
        return '🏠';
      case 'vehiculo':
        return '🚗';
      case 'tarjeta':
        return '💳';
      default:
        return '💼';
    }
  }, []);

  const getCategoryColor = useCallback((type: CreditProduct['type']) => {
    switch (type) {
      case 'personal':
        return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700';
      case 'hipotecario':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700';
      case 'vehiculo':
        return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700';
      case 'tarjeta':
        return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  }, []);

  const isFormValid = useMemo(() => {
    return form.requestedAmount > 0 &&
           form.monthlyIncome > 0 &&
           form.purpose.length > 0 &&
           form.personalInfo.fullName.length > 0 &&
           form.personalInfo.email.length > 0 &&
           form.personalInfo.phone.length > 0 &&
           form.personalInfo.id.length > 0;
  }, [form]);

  const monthlyPayment = useMemo(() => {
    if (!selectedProduct || !form.requestedAmount || !form.term) return 0;
    
    const principal = form.requestedAmount;
    const monthlyRate = (selectedProduct.rate / 100) / 12;
    const numberOfPayments = form.term;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }, [selectedProduct, form.requestedAmount, form.term]);

  if (submitSuccess) {
    return (
      <main className="apply-credit-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              ¡Solicitud Enviada Exitosamente!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Hemos recibido tu solicitud de {selectedProduct?.title}. Te contactaremos en las próximas 24 horas.
            </p>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setCurrentStep(1);
                setSelectedProduct(null);
                setForm({
                  productId: '',
                  requestedAmount: 0,
                  term: 12,
                  monthlyIncome: 0,
                  purpose: '',
                  personalInfo: { fullName: '', email: '', phone: '', id: '' }
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors"
            >
              Nueva Solicitud
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="apply-credit-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Solicitar Crédito
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Encuentra el producto financiero ideal para tus necesidades
          </p>
        </header>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between max-w-md mx-auto mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Producto</span>
            <span>Información</span>
            <span>Confirmación</span>
          </div>
        </div>

        {/* Step 1: Product Selection */}
        {currentStep === 1 && (
          <section className="products-selection">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Selecciona el tipo de crédito que necesitas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {creditProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`product-card p-6 border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${getCategoryColor(product.type)}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProductSelect(product);
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getProductIcon(product.type)}</span>
                      <div>
                        <h3 className="font-bold text-lg">{product.title}</h3>
                        <p className="text-sm opacity-80">
                          Tasa desde {product.rate}% E.A.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm mb-4 opacity-90">
                    {product.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Monto:</span>
                      <span className="font-medium">
                        {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Plazo:</span>
                      <span className="font-medium">
                        {product.minTerm} - {product.maxTerm} meses
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">Beneficios principales:</h4>
                    <ul className="text-xs space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <span className="text-green-600">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Step 2: Application Form */}
        {currentStep === 2 && selectedProduct && (
          <section className="application-form">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Información de la Solicitud
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Product Info */}
                  <div className="md:col-span-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {getProductIcon(selectedProduct.type)} {selectedProduct.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tasa: {selectedProduct.rate}% E.A. • Plazo: {selectedProduct.minTerm}-{selectedProduct.maxTerm} meses
                    </p>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Monto Solicitado
                    </label>
                    <input
                      type="number"
                      min={selectedProduct.minAmount}
                      max={selectedProduct.maxAmount}
                      value={form.requestedAmount}
                      onChange={(e) => handleFormChange('requestedAmount', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Entre {formatCurrency(selectedProduct.minAmount)} y {formatCurrency(selectedProduct.maxAmount)}
                    </p>
                  </div>

                  {/* Term */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Plazo (meses)
                    </label>
                    <select
                      value={form.term}
                      onChange={(e) => handleFormChange('term', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      {Array.from(
                        { length: (selectedProduct.maxTerm - selectedProduct.minTerm) / 6 + 1 },
                        (_, i) => selectedProduct.minTerm + i * 6
                      ).map(term => (
                        <option key={term} value={term}>{term} meses</option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly Income */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ingresos Mensuales
                    </label>
                    <input
                      type="number"
                      value={form.monthlyIncome}
                      onChange={(e) => handleFormChange('monthlyIncome', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Propósito del Crédito
                    </label>
                    <select
                      value={form.purpose}
                      onChange={(e) => handleFormChange('purpose', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="personal">Gastos Personales</option>
                      <option value="consolidacion">Consolidación de Deudas</option>
                      <option value="vivienda">Vivienda</option>
                      <option value="vehiculo">Vehículo</option>
                      <option value="negocio">Negocio</option>
                      <option value="educacion">Educación</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-4">
                  Información Personal
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={form.personalInfo.fullName}
                      onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Documento de Identidad
                    </label>
                    <input
                      type="text"
                      value={form.personalInfo.id}
                      onChange={(e) => handlePersonalInfoChange('id', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={form.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                {/* Loan Calculator */}
                {form.requestedAmount > 0 && form.term > 0 && (
                  <div className="mt-6">
                    <Suspense fallback={<SectionSuspenseFallback />}>
                      <LoanCalculator
                        amount={form.requestedAmount}
                        rate={selectedProduct.rate}
                        term={form.term}
                        monthlyPayment={monthlyPayment}
                      />
                    </Suspense>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    ← Volver
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!isFormValid}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && selectedProduct && (
          <section className="confirmation">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Confirmar Solicitud
                </h2>

                <div className="space-y-6">
                  {/* Product Summary */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Producto Seleccionado
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {getProductIcon(selectedProduct.type)} {selectedProduct.title}
                    </p>
                  </div>

                  {/* Loan Details */}
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Detalles del Crédito
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Monto:</span>
                        <span className="font-medium ml-2">{formatCurrency(form.requestedAmount)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Plazo:</span>
                        <span className="font-medium ml-2">{form.term} meses</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Tasa:</span>
                        <span className="font-medium ml-2">{selectedProduct.rate}% E.A.</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Cuota Mensual:</span>
                        <span className="font-medium ml-2">{formatCurrency(monthlyPayment)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Nombre:</span>
                        <span className="font-medium ml-2">{form.personalInfo.fullName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Documento:</span>
                        <span className="font-medium ml-2">{form.personalInfo.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <span className="font-medium ml-2">{form.personalInfo.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {submitError && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md">
                    <p className="text-red-700 dark:text-red-300 text-sm">{submitError}</p>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={submitting}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    ← Editar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center space-x-2"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <span>Enviar Solicitud</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
});

ApplyCreditPage.displayName = 'ApplyCreditPage';

export default ApplyCreditPage;
