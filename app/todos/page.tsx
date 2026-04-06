import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos, error } = await supabase.from('todos').select()

  return (
    <div className="min-h-screen bg-obsidian text-ivory p-8 pt-24 font-inter">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-display text-4xl mb-8 text-gold-gradient">Supabase Connection Test</h1>
        
        {error ? (
          <div className="glass p-8 rounded-2xl border border-red-500/20 bg-red-500/5">
            <h2 className="text-xl text-red-400 mb-2 font-syne">Connection Error</h2>
            <p className="text-silver/80 mb-4">{error.message}</p>
            <div className="text-sm font-mono p-4 bg-black/40 rounded-lg text-silver/40 overflow-x-auto">
              {JSON.stringify(error, null, 2)}
            </div>
            <p className="mt-6 text-sm text-silver/60">
              Check that your <code className="text-gold">todos</code> table exists and RLS policies allow selecting data.
            </p>
          </div>
        ) : todos && todos.length > 0 ? (
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li key={todo.id} className="glass p-4 rounded-xl border border-white/5 flex items-center justify-between group hover:border-gold/20 transition-all duration-300">
                <span className="text-lg group-hover:text-gold transition-colors">{todo.name}</span>
                {todo.inserted_at && (
                  <span className="text-silver/50 text-sm font-label">
                    {new Date(todo.inserted_at).toLocaleDateString()}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="glass p-12 rounded-2xl border border-white/5 text-center">
            <p className="text-silver text-lg">No todos found in the <code className="text-gold">todos</code> table.</p>
            <p className="text-silver/50 mt-4 text-sm">The connection was successful, but the table is empty.</p>
          </div>
        )}
        
        <div className="mt-12 text-center flex flex-col items-center gap-4">
          <p className="text-xs text-silver/30 font-label uppercase tracking-widest">
            Supabase Project: {process.env.NEXT_PUBLIC_SUPABASE_URL}
          </p>
          <a href="/" className="font-label text-gold hover:text-ivory transition-colors">
            ← Return to Storefront
          </a>
        </div>
      </div>
    </div>
  )
}
