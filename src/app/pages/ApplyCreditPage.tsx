import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { LoadingSpinner, ErrorMessage } from '../components/common';
import { formatCurrency } from '../../shared/utils/formatters';
import { getProductTypeLabel } from '../../shared/utils/labels';
import type { FinancialProduct } from '../../domain/entities/Product';

interface ApplicationForm {
  productId: string;
  requestedAmount: number;
  term: number;
  monthlyIncome: number;
  purpose: string;
}

export const ApplyCreditPage: React.FC = () => {
  const { user } = useAuth();
  const { products, loading: productsLoading, submitApplication } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const [form, setForm] = useState<ApplicationForm>({
    productId: '',
    requestedAmount: 0,
    term: 12,
    monthlyIncome: 0,
    purpose: '',
  });

  const handleProductSelect = (product: FinancialProduct) => {
    setSelectedProduct(product);
    setForm(prev => ({
      ...prev,
      productId: product.id,
      requestedAmount: product.minAmount,
      term: 12,
    }));
    setShowForm(true);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleFormChange = (field: keyof ApplicationForm, value: string | number) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !selectedProduct) return;

    try {
      setSubmitting(true);
      setSubmitError(null);

      await submitApplication({
        userId: user.id,
        productId: form.productId,
        requestedAmount: form.requestedAmount,
        term: form.term,
        monthlyIncome: form.monthlyIncome,
        purpose: form.purpose,
      });

      setSubmitSuccess(true);
      setShowForm(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Error al enviar la solicitud');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateMonthlyPayment = (amount: number, rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12;
    const payment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    return payment;
  };

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="px-4 sm:px-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Solicitar Crédito</h1>
        <p className="text-gray-600">Elige el producto que mejor se adapte a tus necesidades</p>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-green-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-lg font-medium text-green-800">
                ¡Solicitud enviada exitosamente!
              </h3>
              <p className="text-green-700">
                Tu solicitud ha sido recibida y está siendo procesada. Te contactaremos pronto con
                el resultado.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitSuccess(false);
              setSelectedProduct(null);
              setShowForm(false);
            }}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Solicitar otro crédito
          </button>
        </div>
      )}

      {!showForm && !submitSuccess && (
        <>
          {/* Products Grid */}
          {productsLoading ? (
            <LoadingSpinner text="Cargando productos..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{getProductTypeLabel(product.type)}</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {product.interestRate}% EA
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monto mínimo:</span>
                      <span className="font-medium">{formatCurrency(product.minAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monto máximo:</span>
                      <span className="font-medium">{formatCurrency(product.maxAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Plazo máximo:</span>
                      <span className="font-medium">{product.term} meses</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Requisitos:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {product.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleProductSelect(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
                  >
                    Solicitar ahora
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Application Form */}
      {showForm && selectedProduct && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Solicitud de {selectedProduct.name}
                </h2>
                <p className="text-gray-600">Completa los siguientes datos</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {submitError && (
              <div className="mb-6">
                <ErrorMessage message={submitError} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto solicitado
                  </label>
                  <input
                    type="number"
                    min={selectedProduct.minAmount}
                    max={selectedProduct.maxAmount}
                    value={form.requestedAmount}
                    onChange={e => handleFormChange('requestedAmount', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Entre {formatCurrency(selectedProduct.minAmount)} y{' '}
                    {formatCurrency(selectedProduct.maxAmount)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Plazo (meses)
                  </label>
                  <select
                    value={form.term}
                    onChange={e => handleFormChange('term', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {[6, 12, 18, 24, 36, 48, 60, 72, 84]
                      .filter(term => term <= selectedProduct.term)
                      .map(term => (
                        <option key={term} value={term}>
                          {term} meses
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ingresos mensuales
                </label>
                <input
                  type="number"
                  min="0"
                  value={form.monthlyIncome}
                  onChange={e => handleFormChange('monthlyIncome', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tus ingresos mensuales"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Propósito del crédito
                </label>
                <textarea
                  value={form.purpose}
                  onChange={e => handleFormChange('purpose', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe para qué necesitas el crédito"
                  required
                />
              </div>

              {/* Payment Preview */}
              {form.requestedAmount > 0 && form.term > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Estimación de pago</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-blue-700">Cuota mensual estimada:</p>
                      <p className="font-semibold text-blue-900">
                        {formatCurrency(
                          calculateMonthlyPayment(
                            form.requestedAmount,
                            selectedProduct.interestRate,
                            form.term
                          )
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Total a pagar:</p>
                      <p className="font-semibold text-blue-900">
                        {formatCurrency(
                          calculateMonthlyPayment(
                            form.requestedAmount,
                            selectedProduct.interestRate,
                            form.term
                          ) * form.term
                        )}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    * Esta es una estimación. El valor final puede variar según la evaluación
                    crediticia.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" text="" />
                      <span className="ml-2">Enviando...</span>
                    </div>
                  ) : (
                    'Enviar solicitud'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
