
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Phone, Mail } from 'lucide-react';

interface ContatosSectionProps {
  form: UseFormReturn<any>;
}

export function ContatosSection({ form }: ContatosSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Informações de Contato
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="telefone_principal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone Principal</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(11) 99999-9999" 
                    {...field}
                    onChange={(e) => {
                      // Máscara básica para telefone
                      const phone = e.target.value.replace(/\D/g, '');
                      field.onChange(phone);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telefone_secundario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone Secundário</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(11) 99999-9999" 
                    {...field}
                    onChange={(e) => {
                      const phone = e.target.value.replace(/\D/g, '');
                      field.onChange(phone);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email_pessoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Pessoal
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="email@exemplo.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email_corporativo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Corporativo
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="colaborador@empresa.com" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
