'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'

import { OTPInput } from 'otp-input'
import { cn } from '../../../../lib/utils'

type FormValues = {
  otp: string
}

export function Showcase({ className, ...props }: { className?: string }) {
  const [formDisabled, setFormDisabled] = React.useState(false)

  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    setValue,
    formState,
    register,
  } = useForm<FormValues>({
    defaultValues: {
      otp: '12',
    },
    disabled: formDisabled,
  })

  React.useEffect(() => {
    setFocus('otp')
  }, [setFocus, setValue])

  function onSubmit(values: FormValues) {
    if (values.otp !== '123   ') {
      window.alert('Invalid OTP')
      reset()
      return
    }
    window.alert('Valid OTP')
  }

  const getSlotClassnames = (isFocused: boolean, isSlotActive: boolean) =>
    cn(
      'relative w-10 md:w-20 h-14 md:h-28 text-[2rem] lg:text-[4rem] flex items-center justify-center border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md transition-all [transition-duration:300ms] [--bsh-width:0] [box-shadow:0_0_0_var(--bsh-width)_hsl(var(--accent-foreground)_/_1)]',
      'group-hover:border-accent-foreground/20',
      {
        'border-accent-foreground/20': isFocused,
        '[--bsh-width:4px] z-10': isSlotActive,
        'opacity-50': formState.disabled,
      },
    )

  return (
    <form
      className={cn(
        'mx-auto flex max-w-[980px] justify-center pt-6 pb-4',
        className,
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <OTPInput
            {...field}
            maxLength={6}
            // regexp={null} // Allow everything
            render={({ triggerProps, slots, isFocused }) => (
              <button {...triggerProps} className="flex items-center group">
                <div className="flex">
                  {slots.slice(0, 3).map((slot, idx) => (
                    <div
                      key={idx}
                      className={getSlotClassnames(isFocused, slot.isActive)}
                    >
                      <div className="">{slot.char || ' '}</div>

                      {slot.isActive && slot.char === null && <FakeCaret />}
                    </div>
                  ))}
                </div>

                {/* Layout inspired by Stripe */}
                <div className="flex w-10 justify-center items-center">
                  <div className="w-3 h-1 rounded-full bg-border"></div>
                </div>

                <div className="flex">
                  {slots.slice(3).map((slot, idx) => (
                    <div
                      key={idx}
                      className={getSlotClassnames(isFocused, slot.isActive)}
                    >
                      {slot.char || ' '}

                      {slot.isActive && slot.char === null && <FakeCaret />}
                    </div>
                  ))}
                </div>
              </button>
            )}
          />
        )}
      />
    </form>
  )
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
      <div className="w-px h-8 md:w-0.5 md:h-16 bg-white" />
    </div>
  )
}
