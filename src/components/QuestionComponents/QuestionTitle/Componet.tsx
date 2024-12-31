import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props) => {
    const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

    return (
        <div>
            <Title level={level} style={{textAlign: isCenter ? 'center' : 'start', marginBottom:'0'}}>
                {text}
            </Title>
        </div>
    )
}

export default QuestionTitle