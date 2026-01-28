-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - users can read their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create pricing_plans table
CREATE TABLE public.pricing_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    price_suffix TEXT NOT NULL DEFAULT '/ page',
    description TEXT NOT NULL,
    features TEXT[] NOT NULL DEFAULT '{}',
    is_popular BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

-- Public can read pricing
CREATE POLICY "Anyone can view pricing plans"
ON public.pricing_plans
FOR SELECT
TO anon, authenticated
USING (true);

-- Admins can manage pricing
CREATE POLICY "Admins can manage pricing plans"
ON public.pricing_plans
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content TEXT NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public can read visible reviews (4-5 stars only)
CREATE POLICY "Anyone can view published high-rated reviews"
ON public.reviews
FOR SELECT
TO anon, authenticated
USING (is_visible = true AND rating >= 4);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
ON public.reviews
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can read active services
CREATE POLICY "Anyone can view active services"
ON public.services
FOR SELECT
TO anon, authenticated
USING (is_active = true);

-- Admins can manage services
CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table for user info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_pricing_plans_updated_at
  BEFORE UPDATE ON public.pricing_plans
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default pricing plans
INSERT INTO public.pricing_plans (name, price, price_suffix, description, features, is_popular, sort_order) VALUES
('Standard', 1499, '/ page', 'For basic essays, summaries, and reflections', ARRAY['Quality writing', 'Proper citations', 'Basic formatting', '7-day revisions'], false, 1),
('Advanced', 2299, '/ page', 'For research papers, literature reviews, case studies', ARRAY['Stronger analysis', 'Quality sources', 'Advanced formatting', '7-day revisions', 'Progress updates'], true, 2),
('Premium', 3199, '/ page', 'For complex projects, data-heavy tasks, or tight deadlines', ARRAY['Senior writer', 'Priority support', 'Premium formatting', 'Unlimited revisions', 'Direct communication'], false, 3);

-- Insert default services
INSERT INTO public.services (name, description, icon, sort_order) VALUES
('Essays & Reflections', 'Well-structured essays and thoughtful reflections on any topic', 'FileText', 1),
('Research Papers & Literature Reviews', 'In-depth research with comprehensive literature analysis', 'BookOpen', 2),
('Case Studies', 'Detailed case analyses including Nursing/Healthcare scenarios', 'ClipboardList', 3),
('Reports & Coursework', 'Professional reports and academic coursework assignments', 'FileSpreadsheet', 4),
('Annotated Bibliographies', 'Properly formatted bibliographies with annotations', 'Library', 5),
('Personal Statements', 'Compelling admission essays and personal statements', 'User', 6),
('Presentations', 'Engaging presentations with speaker notes', 'Presentation', 7),
('Editing & Proofreading', 'Professional editing and proofreading services', 'CheckCircle', 8);

-- Insert default reviews
INSERT INTO public.reviews (author_name, rating, content, is_visible) VALUES
('Sarah M.', 5, 'Delivered early with solid references—exactly as requested.', true),
('James K.', 4, 'Clear structure, strong argument, and great sources.', true),
('Emily R.', 5, 'Excellent nursing case study, well-formatted and original.', true),
('Michael O.', 5, 'Outstanding research paper! The writer understood my topic perfectly.', true),
('Grace L.', 5, 'Fast turnaround and excellent quality. Will use again!', true);