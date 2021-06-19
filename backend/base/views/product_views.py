from django.shortcuts import render
from rest_framework import response

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework.response import Response

from base.models import Product, Review

from base.serializer import ProductSerializer

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)



# @api_view(['GET'])
# def getProduct(request, pk):
#     product = None
#     for x in products:
#         if x['_id'] == pk:
#             product = x
#             break

#     return Response(product)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name='sample name',
        price=0,
        brand='sample brand',
        countInStock=0,
        category='Sample category',
        description=''
    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
# date from the form 
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description= data['description']

    product.save()
    
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product wad deleted.')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    # take in the image from the file
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # checkk if User already exists

    already_exists = product.review_set.filter(user=user).exists()

    if already_exists:
        content = {'details': 'Review already exists'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # if user leaves no rating
    elif data['rating'] == 0:
        content = {'details': 'Review has no rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
        
    # Create the review
    else:
        review = Review.objects.create(
            user = user,
            product=product,
            name= user.fist_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        # querryset to total up number of reviews
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating
        product.rating = total / len(reviews)
        product.save()

        return Response({'Review added'})