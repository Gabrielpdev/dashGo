import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";

interface CreateUserFormData {
  name: string
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais')
})

export default function CreateUser(){
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = (values) => {
    console.log(values)
  }


  return (
    <Box>

      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <SideBar/>

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6","8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          
          <Heading size="lg" fontWeight="normal">
            Criar Usuário
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack space="8">
            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
              <Input name="name" label="Nome completo" error={formState.errors.name} {...register('name')} />
              <Input name="name" type="email" label="E-mail" error={formState.errors.email} {...register('email')}/>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6","8"]} width="100%">
              <Input name="password" type="password" label="Senha" error={formState.errors.password} {...register('password')} />
              <Input name="password_confirmation" type="password" error={formState.errors.password_confirmation} label="Confirmação da senha" {...register('password_confirmation')}/>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end" >
            <HStack spacing="4">
              <Link href="/users" passHref >
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button isLoading={formState.isSubmitting} type="submit" colorScheme="pink">Salvar</Button>
            </HStack>
          </Flex>

        </Box>
      </Flex>
    </Box>
  )
}