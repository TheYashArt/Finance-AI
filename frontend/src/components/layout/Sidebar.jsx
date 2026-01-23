import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, ChartBarIcon, CurrencyDollarIcon, CogIcon, ChatBubbleLeftRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Transactions', href: '/transactions', icon: CurrencyDollarIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Recurring', href: '/recurring', icon: CheckCircleIcon },
  { name: 'Goals', href: '/goals', icon: CheckCircleIcon },
  { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
  { name: 'Categories', href: '/categories', icon: CogIcon },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Finance AI</h1>
      </div>
      <nav>
        <ul>
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                    isActive ? 'bg-gray-300' : ''
                  }`
                }
              >
                <item.icon className="h-6 w-6 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;