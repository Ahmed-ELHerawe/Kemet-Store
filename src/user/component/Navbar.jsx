import { useState, useMemo, useRef, useEffect } from 'react';
import { ShoppingCart, Package, Home, Crown, MessageSquare } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import useStore from '../../store';

export default function Navbar({ isScrolled }) {
  const cartItems = useStore((state) => state.cartItems);
  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const location = useLocation();
  const isProductPage = location.pathname.startsWith('/product');

  const navLinks = [
    { to: '/', label: 'Home', icon: <Home size={24} /> },
    { to: '/cart', label: 'Cart', icon: <ShoppingCart size={24} /> },
    { to: '/orders', label: 'Orders', icon: <Package size={24} /> },
    { to: '/connect', label: 'Connect Us', icon: <MessageSquare size={24} /> },
  ];

  const navContainerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0 });

  useEffect(() => {
    const container = navContainerRef.current;
    if (!container) return;
    requestAnimationFrame(() => {
      const activeLink = container.querySelector('.active-link');
      if (!activeLink) return;
      const left = activeLink.offsetLeft + activeLink.offsetWidth / 2 - 30;
      setIndicatorStyle({ left });
    });
  }, [location.pathname]);

  return (
    <div className='fixed w-full z-50'>
      <nav className={'hidden md:flex w-full z-50 transition-all duration-500 '
         + (isScrolled || isProductPage ? 'bg-[#0A0A0A]/95 backdrop-blur-md py-3 shadow-2xl border-b border-[#D4AF37]' : 'bg-gradient-to-b from-black/80 to-transparent py-5') + ' max-w mx-auto px-4  lg:px-8 items-center justify-between'}>
        <div className='flex items-center gap-2 text-[#D4AF37] font-serif font-bold text-3xl tracking-widest'>
          <Crown size={28} />
          KEMET
        </div>
        <div className='flex items-center gap-8 text-sm font-medium'>
          {navLinks.map(({ to, label, icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => 'flex items-center gap-2 transition-colors relative ' + (isActive ? 'text-[#D4AF37] font-bold border-b-2 border-[#D4AF37]' : 'text-gray-300 hover:text-[#D4AF37]')}>
              {label} {icon}
              {to === '/cart' && cartCount > 0 && (
                <span className='absolute -top-2 -right-3 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full px-2 py-0.5'>
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <header className='md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-md py-4 shadow-md flex justify-center'>
        <div className='flex items-center gap-2 text-[#D4AF37] font-serif font-bold text-3xl tracking-widest'>
          <Crown size={28} />
          KEMET
        </div>
      </header>

      <nav className='md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full px-4'>
        <div className='relative bg-[#0A0A0A]/95 backdrop-blur-md rounded-2xl flex justify-around items-center border border-[#D4AF37]/30 shadow-xl h-[70px]'>
          <div className='absolute top-[-30px] w-[60px] h-[60px] bg-[#D4AF37] rounded-full border-4 border-black transition-all duration-500 shadow-lg flex items-center justify-center' style={indicatorStyle} />
          <div ref={navContainerRef} className='flex justify-around items-center w-full'>
            {navLinks.map(({ to, icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) => 'relative flex items-center justify-center w-[60px] h-[60px] transition-all duration-300 ' + (isActive ? '-translate-y-6 text-black active-link' : 'text-gray-400')}>
                {icon}
                {to === '/cart' && cartCount > 0 && (
                  <span className='absolute -top-1 -right-1 bg-black text-[#D4AF37] text-[10px] font-bold rounded-full px-2 py-0.5 border border-[#D4AF37]'>
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}