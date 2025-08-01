import React, { memo, useCallback, useMemo } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  category: 'tarjeta' | 'prestamo' | 'hipoteca' | 'inversion';
  rate: number;
  minAmount?: number;
  maxAmount?: number;
  features: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface SuggestedProductsProps {
  // Add props interface if needed in the future
}

const SuggestedProducts: React.FC<SuggestedProductsProps> = memo(() => {
  // Mock data para productos financieros sugeridos
  const suggestedProducts = useMemo<Product[]>(() => [
    {
      id: '1',
      title: 'Tarjeta de Crédito Gold',
      description: 'Tarjeta con beneficios exclusivos y sin cuota de manejo el primer año',
      category: 'tarjeta',
      rate: 2.1,
      minAmount: 500000,
      maxAmount: 20000000,
      features: ['Sin cuota de manejo primer año', 'Puntos por compras', 'Seguros incluidos']
    },
    {
      id: '2',
      title: 'Préstamo Personal',
      description: 'Financiación rápida para tus proyectos personales con tasas preferenciales',
      category: 'prestamo',
      rate: 1.8,
      minAmount: 1000000,
      maxAmount: 50000000,
      features: ['Aprobación en 24 horas', 'Sin codeudor', 'Plazo hasta 60 meses']
    },
    {
      id: '3',
      title: 'Crédito Hipotecario VIS',
      description: 'Realiza el sueño de tu casa propia con nuestro crédito hipotecario',
      category: 'hipoteca',
      rate: 1.2,
      minAmount: 50000000,
      maxAmount: 500000000,
      features: ['Tasa fija', 'Subsidio VIS', 'Plazo hasta 20 años']
    }
  ], []);

  const handleProductClick = useCallback((productId: string) => {
    console.log('Product clicked:', productId);
    // Navigate to product application
  }, []);

  const handleMoreInfoClick = useCallback((productId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('More info clicked:', productId);
    // Show product details modal or navigate to details page
  }, []);

  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  }, []);

  const getCategoryIcon = useCallback((category: Product['category']) => {
    switch (category) {
      case 'tarjeta':
        return '💳';
      case 'prestamo':
        return '💰';
      case 'hipoteca':
        return '🏠';
      case 'inversion':
        return '📈';
      default:
        return '💼';
    }
  }, []);

  const getCategoryColor = useCallback((category: Product['category']) => {
    switch (category) {
      case 'tarjeta':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
      case 'prestamo':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'hipoteca':
        return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'inversion':
        return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  }, []);

  return (
    <section className="suggested-products bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <header className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Productos Sugeridos
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Productos financieros recomendados para ti
        </p>
      </header>
      
      <div className="products-grid space-y-4">
        {suggestedProducts.map((product) => (
          <article
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="product-card p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-blue-300 dark:hover:border-blue-500"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleProductClick(product.id);
              }
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="product-icon text-2xl">
                  {getCategoryIcon(product.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                    Tasa desde {product.rate}% E.A.
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {product.description}
            </p>

            {product.minAmount && product.maxAmount && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Monto: {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                </p>
              </div>
            )}

            <div className="features mb-4">
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-1">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={(e) => handleMoreInfoClick(product.id, e)}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm transition-colors"
              >
                Más información
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                Solicitar
              </button>
            </div>
          </article>
        ))}
      </div>
      
      <footer className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 text-center">
        <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
          Ver todos los productos
        </button>
      </footer>
    </section>
  );
});

SuggestedProducts.displayName = 'SuggestedProducts';

export default SuggestedProducts;
