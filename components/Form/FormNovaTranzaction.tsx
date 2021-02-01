import { useForm } from 'react-hook-form'
import styled from 'styled-components';
import { db } from '../../utils/Firebase';
import { TranzactionData } from '../../utils/interfaces/TranzactionsInterface'


const FormTranzaction = styled.form`
    max-width: 500px;
`

const TitleForm = styled.h1`
    margin-top: 0;
`

const FormGroup = styled.div`
    margin-top: 0.8rem;
`

const FormGroupActions = styled.div`
    margin-top: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FormInput = styled.input`
    border: none;
    border-radius: .2rem;
    padding: 0.6rem;
    width: 100%;
    background: #dcdcdc;
`

const ButtonSubmit = styled.button`
    width: 45%;    
    color: green;
`
const ButtonReset = styled.button`
    width: 45%;
    color: gray;
`

const closeModal = () => {
    document.querySelector('#modal')?.classList.remove('modal-active')
}

const FormNovaTranzaction = () => {

    const { register, errors, handleSubmit } = useForm({
        mode: 'onBlur'
    })

    const onSubmit = async (data: TranzactionData) => {
        
        data.amount = data.amount * 100               

        db.collection('tranzactions')
            .doc()
            .set(data)
            .then(() => {                
                closeModal()
            })
    }

    return <>
        <FormTranzaction className='formtranzaction' onSubmit={handleSubmit(onSubmit)} >
            <TitleForm>Adicionar Nova Tranzação</TitleForm>
            <FormGroup>
                <label className='sr-only' htmlFor='description'>Descrição</label>
                <FormInput
                    type='text'
                    id='description'
                    name='description'
                    placeholder='Descrição'
                    ref={register({
                        required: 'Preencha o nome da tranzação.',
                    })}
                />
                {errors.description && (
                    <div><small>{errors.description.message}</small></div>
                )}
            </FormGroup>
            <FormGroup>
                <label className='sr-only' htmlFor='amount'>Valor</label>
                <FormInput
                    type='number'
                    id='amount'
                    name='amount'
                    placeholder='Valor'
                    step='0.01'
                    ref={register({
                        required: 'Coloque o valor da tranzação.',
                    })}
                />
                {errors.amount && (
                    <div><small>{errors.amount.message}</small></div>
                )}
                <small>Use o sinal de - (negativo) para despesas e , (virgula) para as casas decimais.</small>
            </FormGroup>
            <FormGroup>
                <label className='sr-only' htmlFor='date'>Data de Lançamento</label>
                <FormInput
                    type='date'
                    id='date'
                    name='date'
                    placeholder='00/00/0000'
                    ref={register({
                        required: 'Selecione a data de lançamento',
                    })}
                />
                {errors.date && (
                    <div><small>{errors.date.message}</small></div>
                )}
            </FormGroup>
            <FormGroupActions>                
                <ButtonReset onClick={ closeModal } type='reset' className='btn' > Cancelar </ButtonReset>
                <ButtonSubmit type='submit' className='btn adicionar' > Adicionar </ButtonSubmit>
            </FormGroupActions>
        </FormTranzaction>
    </>

}

export default FormNovaTranzaction