'use client'

import React, {useEffect, useMemo} from 'react'
import {SelectInput, useField, useFormFields} from '@payloadcms/ui'

interface ProjectCategoryFieldProps {
  path: string
  name?: string
  label?: string
  required?: boolean
}

export const ProjectCategoryField: React.FC<ProjectCategoryFieldProps> = (props) => {
  const {path, name, label, required} = props
  const {value, setValue} = useField<string>({path})

  // Получаем значение поля type из формы
  const typeField = useFormFields(([fields]) => fields?.type)
  const projectType = typeField?.value as string

  // Опции для разных типов проектов
  const categoryOptions = useMemo(
    () => ({
      defense: [
        {label: 'Уголовные дела, связанные с банкротством', value: 'criminal-bankruptcy'},
        {label: 'Уголовные дела, связанные с активами', value: 'criminal-assets'},
        {label: 'Уголовные дела, связанные с руководителями', value: 'criminal-executives'},
        {label: 'Уголовные дела, связанные с собственностью', value: 'criminal-property'},
      ],
      attack: [
        {label: 'Уголовные дела, связанные с управляющими', value: 'criminal-managers'},
        {label: 'Уголовные дела, связанные с кредиторами', value: 'criminal-creditors'},
        {label: 'Уголовные дела, связанные с сделками', value: 'criminal-deals'},
        {label: 'Уголовные дела, связанные с злоупотреблениями', value: 'criminal-abuses'},
      ],
    }),
    [],
  )

  // Фильтруем опции на основе типа проекта
  const filteredOptions = useMemo(() => {
    if (!projectType) {
      return []
    }
    return categoryOptions[projectType as keyof typeof categoryOptions] || []
  }, [projectType, categoryOptions])

  // Если значение не входит в текущие опции для выбранного типа, очищаем его
  useEffect(() => {
    if (projectType && value && !categoryOptions[projectType as keyof typeof categoryOptions]?.some((option) => option.value === value)) {
      setValue('')
    }
  }, [projectType, value, categoryOptions, setValue])

  return <SelectInput path={path} name={name || ''} label={label} required={required} options={filteredOptions} value={value} onChange={(val) => setValue(Array.isArray(val) ? val[0]?.value : val?.value)} placeholder={!projectType ? 'Сначала выберите тип проекта' : undefined} />
}
