import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import { User } from '@/types';
import axios from 'axios';
import { cn } from '@/src/lib/utils';
import { LoadingSpinner } from './loading_spinner';

const formatDateTime = (timestamp: number) => {
  let formattedDate = new Date(timestamp).toLocaleString("it-IT");
  return formattedDate;
};


const UserCard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_ACMESKY_API_HOST;

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('user_id');

        if (!userId) {
          throw new Error('User ID is not available');
        }

        const response = await axios.get(`${apiUrl}users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [apiUrl]);

  if (loading) return <div className="flex items-center justify-center">
    <LoadingSpinner />
  </div>;
  if (error) return <div className="flex items-center justify-center">
    <LoadingSpinner />
  </div>;

  return (
    user && (
      <Card className={cn(
        'max-w-[800px] w-full p-8 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-500 border border-indigo-600 rounded-lg'
      )}>
        <CardHeader>
          <CardTitle className="text-zinc-100 font-bold tracking-wide mt-4">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded">
            <p className="text-zinc-100">Username: {user.username}</p>
          </div>
          <div className="p-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded">
            <p className="text-zinc-100">Email: {user.email}</p>
          </div>
          {user.address && (
            <div className="p-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded">
              <p className="text-zinc-100">Address: {user.address}</p>
            </div>
          )}
          {user.prontogram_username && (
            <div className="p-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded">
              <p className="text-zinc-100">Prontogram username: {user.prontogram_username}</p>
            </div>
          )}
          <div className="p-4 bg-white bg-opacity-10 border border-white border-opacity-30 rounded">
            <p className="text-zinc-100">Created At: {formatDateTime(Number(user.created_at))}</p>
          </div>
        </CardContent>
      </Card>
    )
  );
};

export default UserCard;
