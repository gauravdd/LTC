import { Breadcrumb, SimpleCard } from 'app/components'
import { Button, Icon, Grid, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLTCPolicy } from './store/LTCPolicy.action'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
    marginBottom: '16px',
}))

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const AddLTCPolicy = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [policyId, setPolicyId] = useState('')
    const [coverageId, setCoverageId] = useState('')
    const [quoteId, setQuoteId] = useState('')

    const handlePolicyId = (e) => setPolicyId(e.target.value)
    const handleCoverageId = (e) => setCoverageId(e.target.value)
    const handleQuoteId = (e) => setQuoteId(e.target.value)

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(
            addLTCPolicy({
                policyId,
                coverageId,
                quoteId,
            })
        )
        navigate('/LTCPolicy')
    }

    useEffect(() => {
        return () => {
            setPolicyId('')
            setCoverageId('')
            setQuoteId('')
        }
    }, [])

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'AddLTCPolicy', path: '/LTCPolicy' },
                        { name: 'Form' },
                    ]}
                />
            </div>
            <SimpleCard title="Add Form">
                <ValidatorForm onSubmit={handleClick} onError={() => null}>
                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                type="text"
                                name="policyId"
                                id="policyIdInput"
                                onChange={handlePolicyId}
                                value={policyId}
                                validators={['required']}
                                label="PolicyId"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="coverageId"
                                id="coverageIdInput"
                                onChange={handleCoverageId}
                                value={coverageId}
                                validators={['required']}
                                label="CoverageId"
                                errorMessages={['this field is required']}
                            />

                            <TextField
                                type="text"
                                name="quoteId"
                                id="quoteIdInput"
                                onChange={handleQuoteId}
                                value={quoteId}
                                validators={['required']}
                                label="QuoteId"
                                errorMessages={['this field is required']}
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" color="primary" variant="contained">
                        <Icon>add</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
                            Add
                        </Span>
                    </Button>
                </ValidatorForm>
            </SimpleCard>
        </Container>
    )
}

export default AddLTCPolicy
