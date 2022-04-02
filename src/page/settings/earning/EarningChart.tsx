import React, { FC } from 'react';
import styled from 'styled-components';
import Chart from 'react-apexcharts';

const Wrapper = styled.div<Partial<IProps>>``;

interface IProps {
    className?: string;
    id?: string;
    style?: any;
    date: any;
    earning: any;
    options?: any;
    series?: any;
}

const EarningChart: FC<IProps> = (props) => {
    const { id, style, earning, date, options, series } = props;

    return (
        <Wrapper id={id} style={style} earning={earning} date={date}>
            <div id="chart">
                <Chart options={options} series={series} type="line" height={350} />
            </div>
        </Wrapper>
    );
};

EarningChart.defaultProps = {};

export default EarningChart;
