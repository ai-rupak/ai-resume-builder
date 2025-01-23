import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from 'lucide-react';

const Header = () => {
  const { user, handleLogout } = useAuth();

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-md">
      <Link to={'/'}>
        <img src="/logo.svg" alt="Logo" width={40} height={40} />
      </Link>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <UserCircle className="w-8 h-8" />
                  )}
                  <span className="font-medium">{user.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to={'/auth/sign-in'}>
              <Button>Get Started</Button>
            </Link>
            <Link to={'/auth/sign-in'}>
              <Button variant="outline">Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;