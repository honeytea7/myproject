import { Select } from "antd";

import React from "react";
import { Raw } from "../type";

type SelectProps = React.ComponentProps<typeof Select>
// 继承Select组件的许多props
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'>{
    value: Raw | null | undefined,
    onChange: (value?: number) => void,
    defaultOptionName?: string,
    options?:{name:string,id:number}[]
}

// value可以传入多种类型的值
// onChange只会回调number | undefined类型
// 当i是N啊N(Number(value))为true的时候代表选择默认类型
// 当选择默认类型的时候，onChange会回调undefined

export const IdSelect = (props:IdSelectProps) => {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return <Select value={options?.length ?toNumber(value):0}
        onChange={value => onChange(toNumber(value))}>
        {
            defaultOptionName ? <Select.Option value={0}>{ defaultOptionName}</Select.Option>:null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={option.id}>{ option.name}</Select.Option>)
        }
                    </Select>
}

const toNumber = (value:unknown) =>isNaN(Number(value))?0:Number(value)